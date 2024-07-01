import { Injectable } from '@nestjs/common';
import { ConvertableFile } from '../types/convertable-file.type';
import { ExternalConverterService } from './external-converter.service';
import { InternalConverterService } from './internal-converter.service';

@Injectable()
export class ConverterService {
  constructor(
    private readonly externalConverterService: ExternalConverterService,
    private readonly internalConverterService: InternalConverterService
  ) {}

  async convert(convertable: ConvertableFile): Promise<string> {
    const useInternal = true;

    if (useInternal) {
      return this._convertInternal(convertable);
    } else {
      return this._convertExternal(convertable);
    }
  }

  private async _convertInternal(convertable: ConvertableFile): Promise<any> {
    const fileUri = await this.internalConverterService.convert(convertable);
    return fileUri;
  }

  private async _convertExternal(convertable: ConvertableFile): Promise<string> {
    const fileUri = await this.externalConverterService.convert(convertable);
    return 'EXTERNAL OK';
  }
}
