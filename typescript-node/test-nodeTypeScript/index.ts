type Person = {
  name: string;
  age: number;
  id: number;
};
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
const me: Person = {
  name: "asd",
  age: 1,
  id: 12,
};
console.log("Hello");

Object.keys(me).map(key => {
  console.log(me[key as keyof Person]);
});

const hash = {
  first: 1,
  second: 2,
  third: 3,
};

type Mapper<T> = {
  [key in keyof T]: number;
};

type Result<T> = {
  [key in keyof T]: () => number;
};
const transform = <T>(mapper: Mapper<T>) => {
  const result = {} as Result<T>;

  (Object.keys(mapper) as (keyof T)[]).map(key => {
    result[key] = () => mapper[key];
  });

  return result;
};
type Result_StackOverFlow<T> = {
  [Key in keyof T]: () => T[Key];
};

const transform_StackOverFlow = <T extends object>(
  obj: T
): Result_StackOverFlow<T> => {
  return (Object.keys(obj) as Array<keyof T>).reduce((result, key) => {
    result[key] = () => obj[key];
    return result;
  }, {} as Result_StackOverFlow<T>);
};
type Test = keyof typeof hash;
type Hash = typeof hash;
const a = transform<Hash>(hash);
const b = transform_StackOverFlow(hash);
console.log(b.second());
console.log(a.first());
