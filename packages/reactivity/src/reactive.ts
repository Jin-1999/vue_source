import { isObject } from "@vue/shared";

import { mutableHandler, ReactiveFlags } from "./baseHandler";

const reactiveMap = new WeakMap();

export function reactive(target: any) {
  if (!isObject(target)) {
    console.warn(`value cannot be made reactive: ${String(target)}`);
    return target;
  }

  if (target[ReactiveFlags.IS_REACTIVE]) return target;

  const cacheProxy = reactiveMap.get(target);
  if (cacheProxy) return cacheProxy;

  const proxy = new Proxy(target, mutableHandler);

  reactiveMap.set(target, proxy);

  return proxy;
}
