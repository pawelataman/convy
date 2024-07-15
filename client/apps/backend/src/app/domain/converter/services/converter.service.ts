import { normalizeFileName } from '@backend/common/utils/file';
import { STATIC_STORAGE_CONFIG } from '@backend/core/config/storage.config';
import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { StorageUploadInfo } from '@backend/core/storage/storage-upload.type';
import { generateUuid } from '@libs/utils/guid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConvertableFile } from '../types/convertable-file.type';
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

    const path = await this._delegateConversion(convertable, storageUploadInfo, useInternal);

    return `${STATIC_STORAGE_CONFIG.staticEndpoint}/${path}`;
  }

  private _delegateConversion(convertable: ConvertableFile, storageUploadInfo: StorageUploadInfo, useInternal: boolean) {
    if (useInternal) {
      return this._convertInternal(convertable, storageUploadInfo);
    } else {
      return this._convertExternal(convertable, storageUploadInfo);
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
