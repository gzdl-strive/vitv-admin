/**
 * 生成一个独一无二的ID
 * @returns { string }
 */
const uuid = (): string => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  const uuid = 'xxxyyxxx-xxxx-6xxx-yxxx-xxxxxyyyxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  })
  return uuid.replace(/-/g, '');
};

/**
 * 延时方法
 * @param1 { number } 延时时间
 * @returns { Promise<void>}
 */
const wait = (timeout: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
}

const Utils = {
  wait,
  uuid
}

export {
  Utils as default,
  uuid,
  wait,
}