// type ObjectKeys<T> = T extends object
//   ? (keyof T)[]
//   : T extends number
//   ? []
//   : T extends Array<any> | string
//   ? string[]
//   : never;
// (Object.keys(test) as Array<keyof typeof userCarQuery>).map((member) => {});
// declare let data: userCarQuery;
// interface IPerson {
//     name: string;
//     age: number;
//     gender: string;
// }

// type PartialPerson = Partial<IPerson>
// const partialPerson: PartialPerson = {
//     gender: "male"
// }

// type RequiredPerson = Required<PartialPerson>

// const requiredPerson: RequiredPerson = {
//     name: "asd",
//     age: 20,
//     gender: "asd"
// }

// type PickPerson = Pick<IPerson, "name" | "age">
// const pickPerson: PickPerson = {
//     name: "asd",
//     age: 1223
// }
// const va = {a:2,b:"asd"}
// let type:  typeof va

// type PickPerson2 = Pick<IPerson, "name" | "age"> & Pick<Partial<IPerson>, "gender">;
// const pickPerson2: PickPerson2 =
// {
//     name: "Jade",  // required
//     age: 29,       // required
//     gender: "male" // optional
// }
