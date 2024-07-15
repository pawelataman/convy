import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioClient implements OnModuleInit {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_HOST'),
      port: Number(this.configService.get<number>('MINIO_PORT')),
      useSSL: false,
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });

    this.bucketName = configService.get('MINIO_DEFAULT_BUCKETS');
  }

  async onModuleInit() {
    if (!(await this.minioClient.bucketExists(this.bucketName))) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async putObject(objectPath: string, buffer: Buffer): Promise<string> {
    const info = await this.minioClient.putObject(this.bucketName, objectPath, buffer);
    return info.versionId;
  }

  async retrieveFile(filePath: string): Promise<Readable> {
    return this.minioClient.getObject(this.bucketName, filePath);
  }
}
