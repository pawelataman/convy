import { DatabaseService } from '@backend/src/app/common/database/database.service';
import { fileType, fileTypeConvertableTo, mediaType } from '@backend/src/app/common/database/schemas/index';
import { FileTypeModel } from '@backend/src/app/core/settings/settings.types';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

@Injectable()
export class SettingsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  getFormatsForFileType(fileTypeId: number): Promise<FileTypeModel[]> {
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

  getSupportedFormats(): Promise<FileTypeModel[]> {
    return this.dbService.dbInstance
      .select({
        id: fileType.id,
        name: fileType.name,
        mediaType: mediaType,
      })
      .from(fileType)
      .leftJoin(mediaType, eq(fileType.media_type_id, mediaType.id))
      .where(eq(fileType.is_supported, true));
  }

  getFileTypeById(targetFormatId: number): Promise<FileTypeModel> {
    return this.dbService.dbInstance.query.fileType.findFirst({
      where: eq(fileType.id, targetFormatId),
    });
  }

  async getMediaTypeByFileTypeId(fileTypeId: number): Promise<string> {
    const [mediaTypeResult] = await this.dbService.dbInstance
      .select({ name: mediaType.name })
      .from(mediaType)
      .rightJoin(fileType, eq(mediaType.id, fileType.media_type_id))
      .where(eq(fileType.id, fileTypeId));
    return mediaTypeResult.name;
  }
}
