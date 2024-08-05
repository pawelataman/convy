import { SettingsRepository } from '@backend/src/app/core/settings/settings.repository';
import { FileTypeModel } from '@backend/src/app/core/settings/settings.types';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {}

  getFormatsForFileType(fileTypeId: number) {
    return this._settingsRepository.getFormatsForFileType(fileTypeId);
  }

  async getSettings(): Promise<ApiGetSettingsResponse> {
    const [supportedFormats] = await Promise.all([this._settingsRepository.getSupportedFormats()]);
    const fileTypesConvertableTo = {};

    try {
      for await (const supportedFormat of supportedFormats) {
        fileTypesConvertableTo[supportedFormat.id] = await this._settingsRepository.getFormatsForFileType(supportedFormat.id);
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return {
      supportedFileTypes: supportedFormats,
      fileTypesConvertableTo,
    };
  }

  async getFileTypeById(targetFormatId: number): Promise<FileTypeModel> {
    return this._settingsRepository.getFileTypeById(targetFormatId);
  }

  async getMediaTypeByFileTypeId(fileTypeId: number) {
    return this._settingsRepository.getMediaTypeByFileTypeId(fileTypeId);
  }
}
