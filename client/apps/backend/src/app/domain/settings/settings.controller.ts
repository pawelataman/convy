import { SettingsService } from '@backend/domain/settings/settings.service';
import { FileType, GetSettingsResponse } from '@libs/api-interface/api-response.interface';
import { IConverterGatewayInterface } from '@libs/api-interface/converter-gateway.interface';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Observable, from } from 'rxjs';

@Controller('settings')
export class SettingsController implements Partial<IConverterGatewayInterface> {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  getSettings(): Observable<GetSettingsResponse> {
    return from(this._settingsService.getSettings());
  }

  @Get('formats/:fileTypeId')
  getFormatsForFileType(@Param('fileTypeId', ParseIntPipe) fileTypeId: number): Observable<FileType[]> {
    return from(this._settingsService.getFormatsForFileType(fileTypeId));
  }
}
