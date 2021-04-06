import { Injectable } from '@nestjs/common';
// import {connectionOptions} from '../entity/ormconfig';
import { createConnection } from 'typeorm';
@Injectable()
export class Database {}

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(),
  },
];
