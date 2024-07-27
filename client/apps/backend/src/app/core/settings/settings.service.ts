import { SettingsRepository } from '@backend/src/app/core/settings/settings.repository';
import { FileTypeModel } from '@backend/src/app/core/settings/settings.types';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {}

  getFormatsForFileType(fileTypeId: number) {
    return this._settingsRepository.getFormatsForFileType(fileTypeId);
  }

  async getSettings(): Promise<ApiGetSettingsResponse> {
    const [supportedFormats] = await Promise.all([this._settingsRepository.getSupportedFormats()]);
    return {
      supportedFileTypes: supportedFormats,
    };
  }

  async getFileTypeById(targetFormatId: number): Promise<FileTypeModel> {
    return this._settingsRepository.getFileTypeById(targetFormatId);
  }

  async getMediaTypeByFileTypeId(fileTypeId: number) {
    return this._settingsRepository.getMediaTypeByFileTypeId(fileTypeId);
  }
}
