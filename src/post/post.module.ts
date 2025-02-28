import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { CreatePostController } from './features/create-post/create-post.controller';
import { CreatePostService } from './features/create-post/create-post.service';
import { DeletePostController } from './features/delete-post/delete-post.controller';
import { DeletePostService } from './features/delete-post/delete-post.service';
import { GetPostsController } from './features/get-many-posts/get-posts.controller';
import { GetPostsService } from './features/get-many-posts/get-posts.service';
import { GetPostController } from './features/get-one-post/get-post.controller';
import { GetPostService } from './features/get-one-post/get-post.service';
import { UpdatePostController } from './features/update-post/update-post.controller';
import { UpdatePostService } from './features/update-post/update-post.service';
import { AbilityModule } from 'src/third-party/ability-factory/ability.module';

const repos = [PostRepository];
const services = [
  CreatePostService,
  DeletePostService,
  GetPostsService,
  GetPostService,
  UpdatePostService,
];

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AbilityModule],
  controllers: [
    CreatePostController,
    DeletePostController,
    GetPostsController,
    GetPostController,
    UpdatePostController,
  ],
  providers: [...repos, ...services],
  exports: [...repos],
})
export class PostModule {}
