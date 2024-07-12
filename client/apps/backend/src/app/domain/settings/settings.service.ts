import { SettingsRepository } from '@backend/domain/settings/settings.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(private readonly _settingsRepository: SettingsRepository) {}

  getFileFormats() {
    return this._settingsRepository.getFileFormats();
  }

  getMediaTypes() {
    return this._settingsRepository.getMediaTypes();
  }
}
