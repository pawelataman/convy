import { StorageUploadInfo } from '@backend/core/storage/storage-upload.type';
import { Controller, Get, Header, HttpCode, HttpStatus, Param, StreamableFile } from '@nestjs/common';
import { StaticService } from './services/static.service';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Get('/:dirName/:fileName')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/tiff')
  async getStaticFile(@Param('dirName') dirName: string, @Param('fileName') fileName: string): Promise<StreamableFile> {
    const storageUploadInfo: StorageUploadInfo = {
      fileName: fileName,
      dirName: dirName,
    };

    const fileReadable = await this.staticService.getUploadedFile(storageUploadInfo);
    return new StreamableFile(fileReadable);
  }
}
