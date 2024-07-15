import { DatabaseService } from '@backend/common/database/database.service';
import storageInfo from '@backend/common/database/schemas/upload-info.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConverterRepository {
  constructor(private readonly dbService: DatabaseService) {}

  saveConvertedFileMetadata(storagePath: string, requestId: string, targetFileTypeId: number) {
    return this.dbService.dbInstance
      .insert(storageInfo)
      .values({
        path: storagePath,
        requestId,
        fileTypeId: targetFileTypeId,
      })
      .returning({ id: storageInfo.id });
  }
}
