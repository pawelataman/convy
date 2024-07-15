import { FileTypeDTO } from '@backend/domain/settings/dto/file-type.dto';
import { SettingsDto } from '@backend/domain/settings/dto/settings.dto';
import { SettingsService } from '@backend/domain/settings/settings.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<SettingsDto> {
    return this._settingsService.getSettings();
  }

  @Get('formats/:fileTypeId')
  async getFormatsForFileType(@Param('fileTypeId', ParseIntPipe) fileTypeId: number): Promise<FileTypeDTO[]> {
    return this._settingsService.getFormatsForFileType(fileTypeId);
  }
}
