import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  private AWS_S3_BUCKET = this.configService.getOrThrow('AWS_S3_BUCKET');
  private AWS_REGION = this.configService.getOrThrow('AWS_REGION');
  private S3 = new S3Client({
    region: this.AWS_REGION,
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  private async s3Upload(file: any, bucket: string, name: string, mimetype: string) {
    const putParams = {
      Bucket: bucket,
      Key: name,
      Body: file.buffer,
      ContentType: mimetype,
    };

    const putCommand = new PutObjectCommand(putParams);

    try {
      await this.S3.send(putCommand);

      return `https://${bucket}.s3.${this.AWS_REGION}.amazonaws.com/${name}`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    const newFileName = `${randomUUID()}-${originalname}`;

    return await this.s3Upload(file, this.AWS_S3_BUCKET, newFileName, file.mimetype);
  }
}
