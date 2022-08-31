import { isFunction } from "@vue/shared";
import { ReactiveEffect } from "./effect";
export const computed = (getterOrOptions) => {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter);
};

class ComputedRefImpl {
  public effect;
  public _dirty = true;
  public _value;
  public __v_isReadonly = true;
  public __v_isRef = true;
  constructor(getter, public setter) {
    // 用户的getter放到effect中, 例如本例中的 get
    this.effect = new ReactiveEffect(getter, () => {});
  }
  get value() {
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }
  set value(newVal) {
    this.setter(newVal);
  }
}
// function computed(getterOrOptions, debugOptions, isSSR = false) {
//     let getter;
//     let setter;
//     const onlyGetter = isFunction(getterOrOptions);
//     if (onlyGetter) {
//         getter = getterOrOptions;
//         setter = () => {
//                 console.warn('Write operation failed: computed value is readonly');
//             }
//             ;
//     }
//     else {
//         getter = getterOrOptions.get;
//         setter = getterOrOptions.set;
//     }
//     const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
//     if (debugOptions && !isSSR) {
//         cRef.effect.onTrack = debugOptions.onTrack;
//         cRef.effect.onTrigger = debugOptions.onTrigger;
//     }
//     return cRef;
// }
