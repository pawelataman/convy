import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';

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

  putObject(objectName: string, buffer: Buffer): Promise<UploadedObjectInfo> {
    const bucketName = this.configService.get('MINIO_DEFAULT_BUCKETS');
    return this.minioClient.putObject(bucketName, objectName, buffer);
  }
}
