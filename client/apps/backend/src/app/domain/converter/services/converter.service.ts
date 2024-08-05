import { normalizeFileName } from '@backend/src/app/common/utils/file';
import { SettingsService } from '@backend/src/app/core/settings/settings.service';
import { FileTypeModel } from '@backend/src/app/core/settings/settings.types';
import { StorageFileService } from '@backend/src/app/core/storage/storage-file.service';
import { StorageUploadInfo } from '@backend/src/app/core/storage/storage.types';
import { ConverterRepository } from '@backend/src/app/domain/converter/services/converter.repository';
import { generateUuid } from '@libs/utils/guid';
import { Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import archiver from 'archiver';
import { Readable } from 'stream';
import { ConvertFileMetadata } from '../types/convertable-file-metadata.type';
import { InternalConverterService } from './internal-converter.service';

@Injectable()
export class ConverterService {
  constructor(
    private readonly internalConverterService: InternalConverterService,
    private readonly storageService: StorageFileService,
    private readonly settingsService: SettingsService,
    private readonly converterRepository: ConverterRepository
  ) {}

  async convert(convertFileMetadata: ConvertFileMetadata): Promise<{ conversionId: string }> {
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
    return {
      conversionId: savedConversionMetadata.id,
    };
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

  async getConvertedImagesAsArchive(conversionIds: string[]): Promise<StreamableFile> {
    try {
      const storageInfos = await this.converterRepository.getConvertedFiles(conversionIds);
      const convertedFiles = await Promise.all(storageInfos.map((storageInfo) => this.storageService.retrieveFile(storageInfo.path)));

      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      // Setup archiver event listeners
      archive.on('error', (err) => {
        console.error('Archive error:', err);
        throw new InternalServerErrorException('Unable to create archive');
      });

      archive.on('warning', (warn) => {
        console.warn('Archive warning:', warn);
      });

      for (let i = 0; i < convertedFiles.length; i++) {
        archive.append(convertedFiles[i], { name: storageInfos[i].fileName });
      }

      archive.finalize();

      return new StreamableFile(archive, {
        type: 'application/zip',
        disposition: `attachment; filename="convy-${new Date().toISOString()}.zip"`,
      });
    } catch (e) {
      throw new InternalServerErrorException('Unable to create archive');
    }
  }
}
