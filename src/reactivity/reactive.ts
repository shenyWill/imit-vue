import { track, trigger } from "./effect";

export const reactive = row => {
  return new Proxy(row, {
    get(target, key) {
      const result = Reflect.get(target, key);
      // 依赖收集
      track(target, key);
      return result;
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value);

      // 触发依赖
      trigger(target, key);
      return result;
    }
  })
}