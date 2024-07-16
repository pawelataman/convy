import { createDbUrl } from '@backend/src/app/common/utils/db';
import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/driver';
import postgres from 'postgres';
import * as schema from './schemas/index';

@Injectable()
export class DatabaseService {
  private readonly _dbClient: postgres.Sql;
  private readonly _dbInstance: PostgresJsDatabase<typeof schema>;

  constructor() {
    this._dbClient = postgres(createDbUrl());
    this._dbInstance = drizzle(this._dbClient, { schema, logger: true });
  }

  get dbInstance(): PostgresJsDatabase<typeof schema> {
    return this._dbInstance;
  }
}
