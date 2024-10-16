type TransformRest<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends " " // 공백제거
    ? `${TransformRest<Rest>}`
    : First extends Lowercase<First>
    ? `${First}${TransformRest<Rest>}`
    : ` ${Uppercase<First>}${TransformRest<Rest>}`
  : S;

export type GenericItemLabel<V = string> =
  V extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${TransformRest<Rest>}`
    : V;

export type GenericItemValue<L = string> = L extends string
  ? `${Lowercase<L>}`
  : L;

export type GenericItemType<T = string, L = T> = {
  label: GenericItemLabel<L>;
  value: GenericItemValue<T>;
};
