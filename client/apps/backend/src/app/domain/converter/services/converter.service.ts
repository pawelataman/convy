import { normalizeFileName } from '@backend/common/utils/file';
import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { generateUuid } from '@libs/utils/guid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConvertableFile } from '../types/convertable-file.type';
import { StorageUploadInfo } from '../types/storage-upload.type';
import { ExternalConverterService } from './external-converter.service';
import { InternalConverterService } from './internal-converter.service';

@Injectable()
export class ConverterService {
  constructor(
    private readonly externalConverterService: ExternalConverterService,
    private readonly internalConverterService: InternalConverterService,
    private readonly storageService: FileStorageService
  ) {}

  async convert(convertable: ConvertableFile): Promise<string> {
    const useInternal = true;
    const storageUploadInfo: StorageUploadInfo = {
      fileName: normalizeFileName(convertable.metadata.fileName, convertable.metadata.targetFormat),
      dirName: generateUuid(),
    };
    if (useInternal) {
      return await this._convertInternal(convertable, storageUploadInfo);
    } else {
      await this._convertExternal(convertable, storageUploadInfo);
    }
  }

  private async _convertInternal(convertable: ConvertableFile, storageUploadInfo: StorageUploadInfo): Promise<string> {
    const convertedImageBuffer = await this.internalConverterService.convert(convertable);
    try {
      return this.storageService.putObject(storageUploadInfo, convertedImageBuffer);
    } catch (e) {
      throw new InternalServerErrorException('Error while writing file to external storage');
    }
  }

  private async _convertExternal(convertable: ConvertableFile, storageUploadInfo: StorageUploadInfo): Promise<string> {
    const fileUri = await this.externalConverterService.convert(convertable);
    return 'EXTERNAL OK';
  }
}
