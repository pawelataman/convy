import { createDbUrl } from '@backend/common/utils/db';
import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/driver';
import postgres from 'postgres';

@Injectable()
export class DatabaseService {
  private _dbClient: postgres.Sql;

  constructor() {
    this._dbClient = postgres(createDbUrl());
    this._dbInstance = drizzle(this._dbClient);
  }

  private _dbInstance: PostgresJsDatabase;

  get dbInstance(): PostgresJsDatabase {
    return this._dbInstance;
  }
}
