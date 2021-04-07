import { ConnectionOptions }from "typeorm"

const config : ConnectionOptions = {
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"admin",
    name:"test",
    entities:[__dirname + '/**/*.entity{.ts}'],
}