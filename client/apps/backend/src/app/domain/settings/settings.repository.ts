import { DatabaseService } from '@backend/core/storage/database.service';
import { fileType, FileTypeModel, mediaType, MediaTypeModel } from '@database/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class SettingsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getFileFormats(): Promise<Partial<FileTypeModel>[]> {
    return this.dbService.dbInstance
      .select({
        id: fileType.id,
        name: fileType.name,
        mediaType: mediaType.name,
      })
      .from(fileType)
      .leftJoin(mediaType, eq(fileType.media_type_id, mediaType.id));
  }

  async getMediaTypes(): Promise<Partial<MediaTypeModel>[]> {
    return this.dbService.dbInstance.select({ id: mediaType.id, name: mediaType.name }).from(mediaType);
  }
}
