import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioClient {
  private minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_HOST'),
      port: Number(this.configService.get<number>('MINIO_PORT')),
      useSSL: false,
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
  }

  async putObject(objectPath: string, buffer: Buffer): Promise<string> {
    const bucketName = this.configService.get('MINIO_DEFAULT_BUCKETS');
    const info = await this.minioClient.putObject(bucketName, objectPath, buffer);
    return info.versionId;
  }

  async retrieveFile(): Promise<any> {
    const bucketName = this.configService.get('MINIO_DEFAULT_BUCKETS');
    //await this.minioClient.
  }
}
