import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post()
  async uploadFile(@Req() req, @Res() res) {
    const file = req.file;
    const bucketName = req.body.bucketName;
    const uploadedFile = await this.bucketService.uploadFile(file, bucketName);
    return res.status(201).send(uploadedFile);
  }

  @Get(':fileName')
  async downloadFile(@Req() req, @Res() res) {
    const fileName = req.params.fileName;
    const bucketName = req.query.bucketName;
    const fileStream = await this.bucketService.downloadFile(fileName, bucketName);
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-type', 'application/octet-stream');
    fileStream.pipe(res);
  }
}
