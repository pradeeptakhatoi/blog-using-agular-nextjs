// posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findOne(id);
    }

    @Post()
    create(@Body() post: PostEntity) {
        return this.postsService.create(post);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() post: Partial<PostEntity>) {
        return this.postsService.update(id, post);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.postsService.remove(id);
    }
}
