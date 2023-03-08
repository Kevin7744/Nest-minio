import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import * as uuid from 'uuid';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BucketService {
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('minioadmin'),
      secretAccessKey: this.configService.get('minioadmin'),
    });
  }

  async uploadFile(file, bucketName) {
    const fileName = uuid.v4();
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: createReadStream(file.path),
    };
    const result = await this.s3.upload(params).promise();
    return { fileName: fileName, url: result.Location };
  }

  async downloadFile(fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    const result = await this.s3.getObject(params).promise();
    return createReadStream(result.Body);
  }
}
