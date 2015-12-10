export default class Dehydrater {
  constructor({emitter: {emit: Function}});
  dehydrate<T>(t: T): {
    promise: Promise<T>;
    next: (t: T) => T | Promise<T>;
  };
  static transaction<T>(t: T, next: (t: T) => T | Promise<T>): Promise<T>;
  static create() : Dehydrater;
}
