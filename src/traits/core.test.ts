import { describe, expect, it } from 'bun:test';
import { implTraits } from './core';

// ── 实验基础类 ──────────────────────────────────────────────────────────────

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: implTraits guarantees runtime implementation
class Counter {
  count = 0;
  label = 'counter';

  testLabel() {
    return `testLabel:${this.display}`;
  }
}

// ── 实验 1：方法 trait，this 能否感知宿主属性 + trait 自身方法 ────────────────
//
// 声明式模式：
//   type MyTrait = { ... }           ← 声明 trait 类型
//   implTraits(Host, { ... })         ← 实现（this 自动推断为 Host & MyTrait）
//   interface Host extends MyTrait {} ← 扩展实例类型

type IncrementTrait = {
  increment(step?: number): Counter;
  reset(): Counter;
  double(): Counter;
};

implTraits(Counter, {
  increment(step = 1) {
    this.count += step; // this.count ← Counter
    return this;
  },
  reset() {
    this.count = 0; // this.count ← Counter
    return this;
  },
  double() {
    return this.increment(this.count); // this.increment ← IncrementTrait，this.count ← Counter
  },
});
// biome-ignore lint/correctness/noUnusedVariables: trait type extension via implTraits
interface Counter extends IncrementTrait {}

// ── 实验 2：getter trait，defineProperty 能否正确挂载 ──────────────────────

type LabelTrait = {
  display: string;
};

implTraits(Counter, {
  get display(): string {
    return `${this.label}(${this.count})`; // this.label, this.count ← Counter
  },
});
// biome-ignore lint/correctness/noUnusedVariables: trait type extension via implTraits
interface Counter extends LabelTrait {}

// ── 实验 3：工厂 trait（带参数），this 需显式声明 ────────────────────────────
//
// implTraits 的 ThisType 在调用处生效，但工厂函数内部定义对象时编译器无法
// 自动感知宿主类型，需通过显式 this 参数或泛型约束来补充。
//
// 推荐写法：this 参数约束宿主结构，工厂与具体 Host 类解耦：
//   function createFooTrait<Host extends { needed: Type }>(opts) {
//     return { method(this: Host) { ... } }
//   }

type PrefixTrait = { prefixed(): string };

function createPrefixTrait<Host extends { label: string }>(prefix: string) {
  return {
    prefixed(this: Host) {
      return `${prefix}::${this.label}`; // this.label ← Host 约束
    },
  };
}

implTraits(Counter, createPrefixTrait<Counter>('app'));
interface Counter extends PrefixTrait {}

// ── 运行时验证 ───────────────────────────────────────────────────────────────

describe('traits/core', () => {
  describe('implTraits — prototype extension', () => {
    it('trait methods are callable on instances', () => {
      const c = new Counter();
      c.increment(3);
      expect(c.count).toBe(3);
      c.reset();
      expect(c.count).toBe(0);
    });

    it('trait method can call sibling trait method via this', () => {
      const c = new Counter();
      c.count = 4;
      c.double(); // double() calls increment(this.count)
      expect(c.count).toBe(8);
    });

    it('getter is correctly mounted via defineProperty', () => {
      const c = new Counter();
      c.count = 5;
      expect(c.display).toBe('counter(5)');
    });

    it('host class method can access trait getter via this', () => {
      const c = new Counter();
      c.count = 3;
      expect(c.testLabel()).toBe('testLabel:counter(3)');
    });

    it('factory trait closes over external params', () => {
      const c = new Counter();
      expect(c.prefixed()).toBe('app::counter');
    });

    it('implTraits does not override constructor', () => {
      const c = new Counter();
      expect(c.constructor).toBe(Counter);
    });

    it('traits live on the prototype, not the instance', () => {
      const c = new Counter();
      expect(Object.hasOwn(c, 'increment')).toBe(false);
      expect(typeof Counter.prototype.increment).toBe('function');
    });

    it('multiple instances share the same trait method reference', () => {
      const a = new Counter();
      const b = new Counter();
      expect(a.increment).toBe(b.increment);
    });
  });

  describe('isCtor guard (via implTraits)', () => {
    it('implTraits is a no-op on non-constructor', () => {
      const arrow = () => {};
      expect(() => implTraits(arrow as never, { x() {} })).not.toThrow();
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// implTraits 实验：User 类 + 多 trait 批量混入
// 核心问题：trait1 能否通过 this 感知 trait2 的方法？（跨 trait 互调）
// ════════════════════════════════════════════════════════════════════════════

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: implTraits guarantees runtime implementation
class User {
  name = 'Alice';
  age = 30;
  scores: number[] = [80, 90, 75];
}

// trait 类型声明
type UserGreetTrait = { greet(): string };
type UserAgeTrait = { isAdult(): boolean; ageGroup(): string };
type UserStatTrait = { avgScore(): number; summary(): string };

implTraits(
  User,
  // trait 1：greet — 跨 trait 调用 ageGroup()（来自 trait 2）
  {
    greet() {
      return `Hi, I'm ${this.name}, I am ${this.ageGroup()}.`; // this.ageGroup ← UserAgeTrait
    },
  },
  // trait 2：age — 内部互调 isAdult()
  {
    isAdult() {
      return this.age >= 18; // this.age ← User
    },
    ageGroup() {
      return this.isAdult() ? 'adult' : 'minor'; // this.isAdult ← 同 trait
    },
  },
  // trait 3：stat — 跨 trait 调用 ageGroup()（来自 trait 2）
  {
    avgScore() {
      const sum = this.scores.reduce((a, b) => a + b, 0); // this.scores ← User
      return Math.round(sum / this.scores.length);
    },
    summary() {
      return `${this.ageGroup()} | avg: ${this.avgScore()}`; // 跨 trait 互调
    },
  },
);

// biome-ignore lint/correctness/noUnusedVariables: trait type extension via implTraits
interface User extends UserGreetTrait, UserAgeTrait, UserStatTrait {}

describe('implTraits — User', () => {
  it('host class properties are accessible in each trait', () => {
    const u = new User();
    expect(u.isAdult()).toBe(true);
    expect(u.avgScore()).toBe(82);
  });

  it('intra-trait method call (isAdult → ageGroup)', () => {
    const u = new User();
    expect(u.ageGroup()).toBe('adult');
  });

  it('cross-trait call from trait1 to trait2 (greet → ageGroup)', () => {
    const u = new User();
    expect(u.greet()).toBe("Hi, I'm Alice, I am adult.");
  });

  it('cross-trait call from trait3 to trait2 (summary → ageGroup + avgScore)', () => {
    const u = new User();
    expect(u.summary()).toBe('adult | avg: 82');
  });

  it('minor user path', () => {
    const u = new User();
    u.age = 15;
    expect(u.isAdult()).toBe(false);
    expect(u.ageGroup()).toBe('minor');
    expect(u.greet()).toBe("Hi, I'm Alice, I am minor.");
  });
});
