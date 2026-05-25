export type Immutable<T> = T extends (...args: any[]) => any ? T : T extends object ? {
    readonly [K in keyof T]: Immutable<T[K]>;
} : T;
export declare function deepFreeze<T>(value: T): Immutable<T>;
