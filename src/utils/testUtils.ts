type SimpleType = string | number | boolean | symbol | undefined | never;

export type RecursivePartial<T> = {
  [K in keyof T]?: T[K] extends SimpleType ? T[K] : RecursivePartial<T[K]>;
};

export const stub = <T>(stubbed: RecursivePartial<T>) => {
  return stubbed as T;
};
