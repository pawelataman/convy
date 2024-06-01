import { GetConfigResponse } from '@global/api-interface/api-response.interface';
import { Controller, Get } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  @Get()
  getConfig(): GetConfigResponse {
    return {
      sourceFormats: ['jpeg', 'png'],
      targetFormats: ['jpeg', 'png'],
    };
  }
}
