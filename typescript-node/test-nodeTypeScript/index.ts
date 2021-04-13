type Person = {
  name: string;
  age: number;
  id: number;
};

const me: Person = {
  name: "asd",
  age: 1,
  id: 12,
};
console.log("Hello");

Object.keys(me).map((key) => {
  console.log(me[key as keyof Person]);
});
