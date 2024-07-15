import { FileTypeModel } from '@backend/core/settings/models';
import { SettingsRepository } from '@backend/core/settings/settings.repository';
import { GetSettingsResponse } from '@libs/api-interface/types/get-settings-response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {}

  getFormatsForFileType(fileTypeId: number) {
    return this._settingsRepository.getFormatsForFileType(fileTypeId);
  }

  async getSettings(): Promise<GetSettingsResponse> {
    const [supportedFormats] = await Promise.all([this._settingsRepository.getSupportedFormats()]);
    return {
      supportedFileTypes: supportedFormats,
    };
  }

  async getFileTypeById(targetFormatId: number): Promise<FileTypeModel> {
    return this._settingsRepository.getFileTypeById(targetFormatId);
  }
}
