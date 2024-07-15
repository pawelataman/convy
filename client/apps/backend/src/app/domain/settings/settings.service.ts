import { SettingsDto } from '@backend/domain/settings/dto/settings.dto';
import { SettingsRepository } from '@backend/domain/settings/settings.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {}

  getFormatsForFileType(fileTypeId: number) {
    return this._settingsRepository.getFormatsForFileType(fileTypeId);
  }

  async getSettings(): Promise<SettingsDto> {
    const [supportedFormats] = await Promise.all([this._settingsRepository.getSupportedFormats()]);
    return {
      supportedFormats,
    };
  }
}
