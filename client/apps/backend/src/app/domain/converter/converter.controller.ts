import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
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
  async convertImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() metadata: ApiConversionRequestMetadata
  ): Promise<ApiConversionResponseMetadata> {
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
