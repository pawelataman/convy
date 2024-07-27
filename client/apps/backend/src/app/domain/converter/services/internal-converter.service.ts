import { Injectable } from '@nestjs/common';
import { IConverter } from '../types/converter.interface';
import { SharpConverterService } from './sharp-converter.service';

@Injectable()
export class InternalConverterService implements IConverter {
  constructor(private sharpConverterService: SharpConverterService) {}

  async convert(buffer: Buffer, targetFormatName: string): Promise<Buffer> {
    return this.sharpConverterService.convert(buffer, targetFormatName);
  }
}
