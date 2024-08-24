import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DrizzleModule],
})
export class PostModule {}
