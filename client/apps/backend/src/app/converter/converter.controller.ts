import { IConverterGatewayInterface } from '@global/api-interface/converter-gateway.interface';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConvertMetadata } from './dto/convert-metadata';

@Controller('converter')
export class ConverterController implements IConverterGatewayInterface {
  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  convertImage(@UploadedFile() file: File, @Body() metadata: ConvertMetadata) {
    console.log(file);
    console.log('target', metadata);
  }
}
