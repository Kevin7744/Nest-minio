import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { BucketController } from './bucket/bucket.controller';
import { BucketService } from './bucket/bucket.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BucketController],
  providers: [BucketService],
})
export class AppModule {}

