import { Injectable } from '@nestjs/common';
import { ConvertableFile } from '../types/convertable-file.type';
import { IConverter } from '../types/converter.interface';
import { SharpConverterService } from './sharp-converter.service';

@Injectable()
export class InternalConverterService implements IConverter {
  constructor(private sharpConverterService: SharpConverterService) {}

  async convert(file: ConvertableFile): Promise<Buffer> {
    return this.sharpConverterService.convert(file.buffer, file.metadata.targetFormat);
  }
}
