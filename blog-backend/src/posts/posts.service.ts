// posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    findOne(id: number): Promise<Post | null> {
        return this.postRepository.findOne({ where: { id } });
    }

    async create(post: Post): Promise<Post> {
        return this.postRepository.save(post);
    }

    async update(id: number, post: Partial<Post>): Promise<void> {
        await this.postRepository.update(id, post);
    }

    async remove(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}