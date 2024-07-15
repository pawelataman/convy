import { SettingsService } from '@backend/domain/settings/settings.service';
import { FileTypeDTO, GetSettingsResponse } from '@libs/api-interface/api-response.interface';
import { IConverterGatewayInterface } from '@libs/api-interface/converter-gateway.interface';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('settings')
export class SettingsController implements Partial<IConverterGatewayInterface> {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<GetSettingsResponse> {
    return this._settingsService.getSettings();
  }

  @Get('formats/:fileTypeId')
  async getFormatsForFileType(@Param('fileTypeId', ParseIntPipe) fileTypeId: number): Promise<FileTypeDTO[]> {
    return this._settingsService.getFormatsForFileType(fileTypeId);
  }
}
