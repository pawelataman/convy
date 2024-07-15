import { DatabaseService } from '@backend/common/database/database.service';
import { fileType, mediaType } from '@backend/common/database/schemas';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class SettingsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getFileFormats(): Promise<Partial<any>[]> {
    return this.dbService.dbInstance
      .select({
        id: fileType.id,
        name: fileType.name,
        mediaType: mediaType.name,
      })
      .from(fileType)
      .leftJoin(mediaType, eq(fileType.media_type_id, mediaType.id));
  }

  async getMediaTypes(): Promise<Partial<any>[]> {
    return this.dbService.dbInstance.select({ id: mediaType.id, name: mediaType.name }).from(mediaType);
  }
}
