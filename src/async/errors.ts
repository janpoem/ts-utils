export class TimeoutError extends Error {
  constructor(
    public readonly ms: number,
    public readonly data?: unknown,
  ) {
    super(`Operation timed out after ${ms}ms`);
    this.name = 'TimeoutError';
  }
}

export class RpcAbortError extends Error {
  constructor(public readonly reason?: unknown) {
    const detail =
      reason != null
        ? `: ${reason instanceof Error ? reason.message : String(reason)}`
        : '';
    super(`RPC aborted${detail}`);
    this.name = 'RpcAbortError';
  }
}
