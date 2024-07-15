import { SettingsRepository } from '@backend/domain/settings/settings.repository';
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
}
