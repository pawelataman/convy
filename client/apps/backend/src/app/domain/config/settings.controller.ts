import { GetSettingsResponse } from '@libs/api-interface/api-response.interface';
import { Controller, Get } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  @Get()
  getSettings(): GetSettingsResponse {
    return {
      sourceFormats: ['jpeg', 'png', 'avif', 'webp', 'tiff'],
      targetFormats: ['jpeg', 'png', 'avif', 'webp', 'tiff'],
    };
  }
}
