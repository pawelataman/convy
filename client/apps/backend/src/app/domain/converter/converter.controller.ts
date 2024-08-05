import { IConverterGateway } from '@libs/api/converter-gateway.interface';
import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
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
export class ConverterController implements IConverterGateway {
  constructor(private readonly converterService: ConverterService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  async convert(@UploadedFile() file: Express.Multer.File, @Body() metadata: ApiConversionRequestMetadata): Promise<ApiConversionResponseMetadata> {
    return this.converterService.convert({
      fileName: file.originalname,
      buffer: file.buffer,
      targetFormatId: metadata.targetFormatId,
      requestId: metadata.requestId,
    });
  }

  @Get('conversion/:conversionId')
  @Header('access-control-expose-headers', 'Content-Disposition')
  @HttpCode(200)
  async getConvertedImage(@Param('conversionId') conversionId: string): Promise<StreamableFile> {
    return this.converterService.getConvertedImage(conversionId);
  }

  @Post('conversion')
  @Header('access-control-expose-headers', 'Content-Disposition')
  @HttpCode(200)
  async getConvertedImages(@Body(new ParseArrayPipe({ items: String })) conversionIds: string[]): Promise<StreamableFile> {
    return this.converterService.getConvertedImagesAsArchive(conversionIds);
  }
}
