import { isObject } from "@vue/shared";
import { reactive } from "./reactive";
import { track, trigger } from "./effect";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

export const mutableHandler = {
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) return true;
    track(target, "get", key);
    // receiver 处理this指向
    const res = Reflect.get(target, key, receiver);
    if (isObject(res)) {
      return reactive(res);
    }
    return res;
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const result = Reflect.set(target, key, value, receiver);
    if (oldValue !== value) {
      trigger(target, "set", key, value, oldValue);
    }
    return result;
  },
};
