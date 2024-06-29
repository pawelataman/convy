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
    return await this.internalConverterService.convert(convertable);
  }
}
