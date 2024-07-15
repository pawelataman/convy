import { DatabaseService } from '@backend/common/database/database.service';
import { fileType, fileTypeConvertableTo } from '@backend/common/database/schemas';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

@Injectable()
export class SettingsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getFormatsForFileType(fileTypeId: number) {
    const convertableTo = alias(fileType, 'convertableTo');
    return this.dbService.dbInstance
      .select({
        id: convertableTo.id,
        name: convertableTo.name,
      })
      .from(fileTypeConvertableTo)
      .rightJoin(fileType, eq(fileType.id, fileTypeConvertableTo.fileTypeId))
      .leftJoin(convertableTo, eq(fileTypeConvertableTo.convertableToId, convertableTo.id))
      .where(eq(fileType.id, fileTypeId));
  }

  async getSupportedFormats() {
    return this.dbService.dbInstance
      .select({
        id: fileType.id,
        name: fileType.name,
      })
      .from(fileType)
      .where(eq(fileType.is_supported, true));
  }
}
