import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { firstValueFrom } from 'rxjs';
import { ConverterService } from './converter.service';
import { ConversionRequestMetadata } from './dto/convert-metadata';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async convertImage(@UploadedFile() file: Express.Multer.File, @Body() metadata: ConversionRequestMetadata) {
    return firstValueFrom(this.converterService.upload(file, metadata));
  }
}
