import { normalizeFileName } from '@backend/common/utils/file';
import { FileStorageService } from '@backend/core/storage/file-storage.service';
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
    const newFileName = normalizeFileName(convertable.metadata.fileName, convertable.metadata.targetFormat);
    if (useInternal) {
      await this._convertInternal(convertable, newFileName);
    } else {
      await this._convertExternal(convertable, newFileName);
    }

    return newFileName;
  }

  private async _convertInternal(convertable: ConvertableFile, newFileName: string): Promise<string> {
    const convertedImageBuffer = await this.internalConverterService.convert(convertable);
    try {
      return await this.storageService.putObject(newFileName, convertedImageBuffer);
    } catch (e) {
      throw new InternalServerErrorException('Error while writing file to external storage');
    }
    return;
  }

  private async _convertExternal(convertable: ConvertableFile, newFileName: string): Promise<string> {
    const fileUri = await this.externalConverterService.convert(convertable);
    return 'EXTERNAL OK';
  }
}
