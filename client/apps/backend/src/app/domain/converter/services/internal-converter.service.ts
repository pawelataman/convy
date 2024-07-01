import { Injectable } from '@nestjs/common';
import { IConverter } from '../interfaces/converter.interface';
import { ConvertableFile } from '../types/convertable-file.type';
import { SharpConverterService } from './sharp-converter.service';

@Injectable()
export class InternalConverterService implements IConverter {
  constructor(private sharpConverterService: SharpConverterService) {}

  async convert(file: ConvertableFile): Promise<string> {
    try {
      const convertedBuffer = await this.sharpConverterService.convert(file.buffer, file.metadata.targetFormat);
      console.log(convertedBuffer);
      return 'OK';
    } catch (e) {
      console.log(e);
      return e;
      return 'ERROR';
    }
  }
}
