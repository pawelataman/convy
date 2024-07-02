import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { ConversionRequestMetadata } from './dto/convert-metadata';
import { ConverterService } from './services/converter.service';
import { ConvertableFile } from './types/convertable-file.type';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  async convertImage(@UploadedFile() file: Express.Multer.File, @Body() metadata: ConversionRequestMetadata): Promise<string> {
    const convertableFile: ConvertableFile = {
      metadata: {
        fileName: file.originalname,
        targetFormat: metadata.targetFormat,
      },
      buffer: file.buffer,
    };
    return this.converterService.convert(convertableFile);
  }
}
