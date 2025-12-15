// 动作签名：可以是同步，也可以是异步
type Action = (...targets: any[]) => any | Promise<any>;
export function call<T>(fn?: () => T, ctx?: any): T {
  if (typeof fn !== "function") {
    return void 0 as T;
  }
  if (ctx) return fn.apply(ctx);
  return fn();
}

// 单个条件分支
interface Condition {
  when: () => boolean;
  action: Action;
  and?: () => boolean;
  or?: () => boolean;
}

export class ConditionalExecutor {
  // 默认分支必须存在
  private defaultAction: Action;
  #cursor?: Condition | null = null;
  #targets: any[] = [];

  // 按优先级存放分支
  private readonly branches: Condition[];

  constructor(defaultAction?: Action) {
    this.defaultAction = defaultAction ?? function () {};
    this.branches = [];
  }

  /** 运行入口 */
  public async run(): Promise<void> {
    for (const { when: when, action, and, or } of this.branches) {
      if (call(when) && call(and) && call(or)) {
        if (typeof action == "function") {
          await action.apply(null, this.#targets);
          return;
        }
      }
    }
    await this.defaultAction();
  }

  public end() {
    return this.run();
  }

  public targets(...targets: any[]) {
    this.#targets = Array.from(targets);
    return this;
  }
  /** 链式注册分支，方便外部 DSL 风格调用 */
  #add(branch: Condition): this {
    this.branches.push(branch);
    return this;
  }

  public when(condition: () => boolean): this {
    this.#cursor = {
      when: condition,
      action: () => {},
    };
    return this;
  }

  public and(condition: () => boolean) {
    if (this.#cursor == null) {
      throw new Error("and 必须在 when 之后调用");
    }
    this.#cursor.and = condition;
    return this;
  }

  public or(condition: () => boolean) {
    if (this.#cursor == null) {
      throw new Error("or 必须在 when 之后调用");
    }
    this.#cursor.or = condition;
    return this;
  }

  public then(action: Action) {
    if (this.#cursor == null) {
      throw new Error("then 必须在 when 之后调用");
    }
    const { when: when, and, or } = this.#cursor;
    this.#add({
      when: when,
      action: action,
      and: typeof and == "function" ? and : () => true,
      or: typeof or == "function" ? or : () => true,
    });
    this.#cursor = null;
    return this;
  }

  public default(action: Action) {
    this.defaultAction = action;
    return this;
  }

  public otherwise(action: Action) {
    this.defaultAction = action;
    return this;
  }

  static create(action?: Action) {
    return new ConditionalExecutor(action);
  }
}
