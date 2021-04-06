import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/src/entities/**/*.ts'],
  subscribers: [__dirname + '/src/subscribers/**/*.ts'],
  migrations: [__dirname + '/databases/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    entitiesDir: 'src/entities',
    subscribersDir: 'src/subscribers',
    migrationsDir: 'databases/migrations',
  },
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
};
function getMigrationDirectory() {
  const directory = process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}
export = connectionOptions;
