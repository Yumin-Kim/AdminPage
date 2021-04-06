import { Injectable } from '@nestjs/common';
import connectionOptions from 'src/config/ormconfig';
import { createConnection } from 'typeorm';
@Injectable()
export class Database {}

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(connectionOptions),
  },
];
