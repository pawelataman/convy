import { normalizeFileName } from '@backend/common/utils/file';
import { FileTypeModel } from '@backend/core/settings/models';
import { SettingsService } from '@backend/core/settings/settings.service';
import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { StorageUploadInfo } from '@backend/core/storage/storage-upload.type';
import { ConverterRepository } from '@backend/domain/converter/services/converter.repository';
import { generateUuid } from '@libs/utils/guid';
import { Injectable, StreamableFile } from '@nestjs/common';
import { Readable } from 'stream';
import { ConvertFileMetadata } from '../types/convertable-file-metadata.type';
import { InternalConverterService } from './internal-converter.service';

@Injectable()
export class ConverterService {
  constructor(
    private readonly internalConverterService: InternalConverterService,
    private readonly storageService: FileStorageService,
    private readonly settingsService: SettingsService,
    private readonly converterRepository: ConverterRepository
  ) {}

  async convert(convertFileMetadata: ConvertFileMetadata): Promise<string> {
    const targetFileType: FileTypeModel = await this.settingsService.getFileTypeById(convertFileMetadata.targetFormatId);
    const storageUploadInfo: StorageUploadInfo = {
      fileName: normalizeFileName(convertFileMetadata.fileName, targetFileType.name),
      dirName: generateUuid(),
    };

    const convertedBuffer = await this.internalConverterService.convert(convertFileMetadata.buffer, targetFileType.name);
    const storagePath = await this.storageService.putObject(storageUploadInfo, convertedBuffer);

    const [savedConversionMetadata] = await this.converterRepository.saveConvertedFileMetadata(
      storagePath,
      storageUploadInfo.fileName,
      convertFileMetadata.requestId,
      targetFileType.id
    );
    return savedConversionMetadata.id;
  }

  async getConvertedImage(conversionId: string): Promise<StreamableFile> {
    const storageInfo = await this.converterRepository.getConvertedFile(conversionId);
    const mediaTypeNameForFileType = await this.settingsService.getMediaTypeByFileTypeId(storageInfo.fileTypeId);
    const convertedFileReadable: Readable = await this.storageService.retrieveFile(storageInfo.path);

    return new StreamableFile(convertedFileReadable, {
      type: mediaTypeNameForFileType,
      disposition: `attachment; filename="${storageInfo.fileName}"`,
    });
  }
}
