import { SettingsService } from '@backend/domain/settings/settings.service';
import { IConverterGatewayInterface } from '@libs/api-interface/converter-gateway.interface';
import { FileType } from '@libs/api-interface/types/file-type';
import { GetSettingsResponse } from '@libs/api-interface/types/get-settings-response';
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
