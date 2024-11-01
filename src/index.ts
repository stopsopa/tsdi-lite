import th from "./th.js";

export class DependencyInjection<T> {
  protected dictionary: T;
  protected keys: (keyof T)[];

  constructor() {
    this.dictionary = {} as T;
    this.keys = [];
  }

  registerService<K extends keyof T>(key: K, value: (typeof this.dictionary)[K]) {
    if (this.keys.includes(key)) {
      /// throw new Error(`tsdi-lite error: key >${key as string}< already exists in the registry`);
      throw th(`key >${key as string}< already exists in the registry`);
    }

    this.dictionary[key] = value;
    this.keys = Object.keys(this.dictionary as object) as (keyof T)[];
  }

  getService<K extends keyof T>(key: K): (typeof this.dictionary)[K] {
    if (!this.keys.includes(key)) {
      /// throw new Error(`tsdi-lite error: key >${key as string}< not found in the registry`);
      throw th(`key >${key as string}< not found in the registry`);
    }

    return this.dictionary[key];
  }
}
