import {
  type EventsCallbacks,
  type EventsEmitter,
  initEventsEmitter,
} from '../events';
import { isNumber, notEmptyStr } from '../guards';
import { clearTimer, timer } from '../misc';
import { RpcAbortError, TimeoutError } from './errors';

export { RpcAbortError };

export type StatefulRpcEvents<Result, Params> = {
  pending: { task: StatefulRpcTask<Params> };
  resolve: { task: StatefulRpcTask<Params>; result: Result };
  reject: { task: StatefulRpcTask<Params>; result: unknown };
  settle: StatefulRpcSettled<Result> & { task: StatefulRpcTask<Params> };
};

export type StatefulRpcOptions<Result, Params> = {
  idPrefix?: string;
  timeout?: number;
  events?: EventsCallbacks<StatefulRpcEvents<Result, Params>>;
};

export interface StatefulRpcTask<Params> {
  // 外部资源 key
  // 如：connect-123
  // 同一个 key 可能存在多个 task （未从外部妥善管理）
  readonly key: string;
  // 内部 task id
  // 每个 task 一个 id
  readonly taskId: string;
  readonly params: Params;
  readonly date: Date;
}

type PendingItem<Result, Params> = {
  task: StatefulRpcTask<Params>;
  resolve: (resp: Result) => void;
  reject: (error: unknown) => void;
  timeout: number;
};

export type StatefulRpcSettled<Result> =
  | {
      key: string;
      type: 'resolve';
      result: Result;
    }
  | {
      key: string;
      type: 'reject';
      result: unknown;
    };

let counter = 0;

export class StatefulRpc<Result = object, Params = object> {
  #id: string;

  #pendings: Map<string, Map<string, PendingItem<Result, Params>>>;

  #timeout: number;

  #taskCounter = 0;

  #emitter: EventsEmitter<StatefulRpcEvents<Result, Params>>;

  constructor({
    idPrefix,
    timeout,
    events,
  }: StatefulRpcOptions<Result, Params> = {}) {
    this.#id = `${notEmptyStr(idPrefix) ? idPrefix : 'stateful-rpc'}-${counter++}`;
    this.#timeout = isNumber(timeout) && timeout > 0 ? timeout : 30 * 1000;
    this.#pendings = new Map();
    this.#emitter = initEventsEmitter(events);
  }

  get id() {
    return this.#id;
  }

  get timeout() {
    return this.#timeout;
  }

  getPendingCount(key?: string): number {
    if (key != null) return this.#pendings.get(key)?.size ?? 0;
    let count = 0;
    for (const items of this.#pendings.values()) count += items.size;
    return count;
  }

  newPendingItem(
    key: string,
    params: Params,
    rest: Omit<PendingItem<Result, Params>, 'task'>,
  ): PendingItem<Result, Params> {
    const taskId = `${this.#id}:${key}:${this.#taskCounter++}`;
    return {
      ...rest,
      task: Object.freeze({ key, taskId, params, date: new Date() }),
    };
  }

  addPendingItem(
    item: PendingItem<Result, Params>,
  ): PendingItem<Result, Params> {
    const { key, taskId } = item.task;
    const map = this.#pendings.get(key);
    if (map == null) {
      this.#pendings.set(key, new Map([[taskId, item]]));
    } else {
      map.set(taskId, item);
    }
    this.#emitter.emit('pending', { task: item.task });
    timer(taskId, () => this.onTimeout(item), item.timeout);
    return item;
  }

  protected onTimeout = ({ task, timeout }: PendingItem<Result, Params>) => {
    this.settle({
      key: task.key,
      type: 'reject',
      result: new TimeoutError(timeout, task),
    });
  };

  removePendingItem(item: PendingItem<Result, Params>) {
    const { key, taskId } = item.task;
    const map = this.#pendings.get(key);
    if (map != null) {
      map.delete(taskId);
      if (map.size <= 0) {
        this.#pendings.delete(key);
      }
    }
    clearTimer(taskId);
    return item;
  }

  pending(key: string, params: Params, timeout?: number): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      this.addPendingItem(
        this.newPendingItem(key, params, {
          resolve,
          reject,
          timeout: timeout ?? this.timeout,
        }),
      );
    });
  }

  settle(settled: StatefulRpcSettled<Result>): this {
    const map = this.#pendings.get(settled.key);
    if (map == null) return this;
    const items = [...map.values()];
    for (const it of items) {
      const { task } = it;
      this.removePendingItem(it);
      this.#emitter.emit(settled.type, { task, result: settled.result });
      this.#emitter.emit('settle', { ...settled, task: it.task });
      if (settled.type === 'resolve') {
        it.resolve(settled.result);
      } else {
        it.reject(settled.result);
      }
    }
    return this;
  }

  resolve = (key: string, result: Result): this =>
    this.settle({ key, type: 'resolve', result });

  reject = (key: string, result: unknown): this =>
    this.settle({ key, type: 'reject', result });

  abort = (key: string, reason?: unknown): this =>
    this.settle({ key, type: 'reject', result: new RpcAbortError(reason) });

  clear(reason?: unknown): this {
    const error = new RpcAbortError(reason);
    for (const key of [...this.#pendings.keys()]) {
      this.settle({ key, type: 'reject', result: error });
    }
    return this;
  }
}
