export type TimeoutHandle = ReturnType<typeof setTimeout>;
export type IntervalHandle = ReturnType<typeof setInterval>;

// 通用的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommonObject = Record<string, any>;