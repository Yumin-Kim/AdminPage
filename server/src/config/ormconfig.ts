import path from "path";
import { Photo } from "src/model/Photo/photo.entity";
import { ConnectionOptions } from 'typeorm';
console.log('ORM Connection');
const connectionOptions: ConnectionOptions = {
  // Other configs here
  type: 'mysql',
  database: 'facerecognition',
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: 'wjqrmsrma!wl6311',
  // My ormconfig isn't in root folder
entities: [path.join(__dirname, '**', '*.entity.{ts}'),Photo],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

function getMigrationDirectory() {
  const directory = process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

export = connectionOptions;
