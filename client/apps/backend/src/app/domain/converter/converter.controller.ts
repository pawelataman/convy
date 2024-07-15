import { ConversionRequestMetadata } from '@libs/api-interface/types/conversion-request-metadata';
import { ConversionResponseMetadata } from '@libs/api-interface/types/conversion-response-metadata';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { ConverterService } from './services/converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  async convertImage(@UploadedFile() file: Express.Multer.File, @Body() metadata: ConversionRequestMetadata): Promise<ConversionResponseMetadata> {
    const convertedFilePath = await this.converterService.convert({
      fileName: file.originalname,
      buffer: file.buffer,
      targetFormatId: metadata.targetFormatId,
      requestId: metadata.requestId,
    });

    return {
      conversionId: convertedFilePath,
    };
  }

  @Get('conversion/:conversionId')
  async getConvertedImage(@Param('conversionId') conversionId: string): Promise<StreamableFile> {
    return this.converterService.getConvertedImage(conversionId);
  }
}
