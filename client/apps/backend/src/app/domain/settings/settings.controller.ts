import { SettingsService } from '@backend/src/app/core/settings/settings.service';
import { ISettingsGateway } from '@libs/api/settings-gateway.interface';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('settings')
export class SettingsController implements ISettingsGateway {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  getSettings(): Promise<ApiGetSettingsResponse> {
    return this._settingsService.getSettings();
  }

  @Get('formats/:fileTypeId')
  getFormatsForFileType(@Param('fileTypeId', ParseIntPipe) fileTypeId: number): Promise<ApiFileType[]> {
    return this._settingsService.getFormatsForFileType(fileTypeId);
  }
}
