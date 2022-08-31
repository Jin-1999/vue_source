export { effect } from "./effect";
export { reactive } from "./reactive";

// 响应式原理探究

// 1.使用reactive对对象类型数据进行响应式处理，使用new Proxy中的get， set方法，
// get函数中使用track方法进行依赖收集 set函数中使用trigger方法进行视图更新（执行副作用函数）

// ~ effect函数（副作用函数）, 立即执行一次，响应式数据变化时候再执行一次

// ~ track函数（依赖收集）, 设立targetMap = new WeakMap()集合存储键和值， 放在activeEffect的deps数组中

// ~ trigger函数（视图更新），新值和旧值不同时触发，在targetMap中获得depsMap, 在depsMap获取相关的依赖，每个依赖都执行effect函数
