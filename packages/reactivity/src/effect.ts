export let activeEffect: any = undefined;
class ReactiveEffect {
  public active = true;
  public parent = null;
  public deps = [];
  constructor(public fn: Function) {}
  run() {
    if (!this.active) {
      return this.fn();
    }

    try {
      this.parent = activeEffect;
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = this.parent;
    }
  }
}

export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn);
  // 先立即执行一次
  _effect.run();
}

const targetMap = new WeakMap();
export function track(target, type, key) {
  // debugger;
  console.log("activeEffect", activeEffect);
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));

  console.log("targetMap", targetMap);
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));

  //去重
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

export function trigger(target, type, key, newVal, oldVal) {
  console.log("==", target, newVal, oldVal);
  const depsMap = targetMap.get(target);
  console.log("depsMap", depsMap);
  if (!depsMap) return; //触发的值不在模板里使用
  const effects = depsMap.get(key);
  console.log("effects", effects);
  effects &&
    effects.forEach((effect) => {
      console.log("effect", effect);
      if (effect !== activeEffect) effect.run();
    });
}
