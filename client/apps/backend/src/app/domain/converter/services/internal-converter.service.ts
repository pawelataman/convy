import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { IConverter } from '../interfaces/converter.interface';
import { ConvertableFile } from '../types/convertable-file.type';
import { FileWriterService } from './file-writer.service';

@Injectable()
export class InternalConverterService implements IConverter {
  constructor(private readonly fileWriterService: FileWriterService) {}

  async convert(file: ConvertableFile): Promise<string> {
    return this.fileWriterService.writeFile(file.metadata.fileName, file.metadata.targetFormat, async (fileUri: string) => {
      await sharp(file.buffer).toFile(fileUri);
      return fileUri;
    });
  }
}
