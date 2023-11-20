import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, ObjectCannedACL, GetObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  AWS_S3_BUCKET = this.configService.getOrThrow('AWS_S3_BUCKET');
  S3 = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  private async s3Upload(file: any, bucket: string, name: string, mimetype: string) {
    const putParams = {
      Bucket: bucket,
      Key: name,
      Body: file,
      ACL: ObjectCannedACL.public_read,
      ContentType: mimetype,
    };

    const getParams = {
      Bucket: bucket,
      Key: name,
    };

    const putCommand = new PutObjectCommand(putParams);

    const getCommand = new GetObjectCommand(getParams);

    try {
      await this.S3.send(putCommand);

      const object = await this.S3.send(getCommand);

      return await object.Body.transformToString();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    const newFileName = `${randomUUID()}-${originalname}`;

    return await this.s3Upload(file, this.AWS_S3_BUCKET, newFileName, file.mimetype);
  }
}
