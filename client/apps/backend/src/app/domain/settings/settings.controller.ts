import { SettingsService } from '@backend/domain/settings/settings.service';
import { Controller, Get } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    const fileFormats = await this._settingsService.getFileFormats();
    const mediaTypes = await this._settingsService.getMediaTypes();

    return {
      fileFormats,
      mediaTypes,
    };
  }
}
