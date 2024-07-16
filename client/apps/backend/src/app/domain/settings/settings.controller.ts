import { SettingsService } from '@backend/core/settings/settings.service';
import { IConverterGatewayInterface } from '@libs/api/converter-gateway.interface';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { from, Observable } from 'rxjs';

@Controller('settings')
export class SettingsController implements Partial<IConverterGatewayInterface> {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  getSettings(): Observable<ApiGetSettingsResponse> {
    return from(this._settingsService.getSettings());
  }

  @Get('formats/:fileTypeId')
  getFormatsForFileType(@Param('fileTypeId', ParseIntPipe) fileTypeId: number): Observable<ApiFileType[]> {
    return from(this._settingsService.getFormatsForFileType(fileTypeId));
  }
}
