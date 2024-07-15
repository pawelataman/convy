import { DatabaseService } from '@backend/common/database/database.service';
import storageInfo from '@backend/common/database/schemas/upload-info.schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ConverterRepository {
  constructor(private readonly dbService: DatabaseService) {}

  saveConvertedFileMetadata(storagePath: string, fileName: string, requestId: string, targetFileTypeId: number) {
    return this.dbService.dbInstance
      .insert(storageInfo)
      .values({
        path: storagePath,
        fileName,
        requestId,
        fileTypeId: targetFileTypeId,
      })
      .returning({ id: storageInfo.id });
  }

  getConvertedFile(conversionId: string) {
    return this.dbService.dbInstance.query.storageInfo.findFirst({
      where: eq(storageInfo.id, conversionId),
    });
  }
}
