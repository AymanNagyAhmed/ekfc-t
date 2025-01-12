import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@/common/database/abstract.repository';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, UpdateQuery, FilterQuery } from 'mongoose';
import { Post } from '@/modules/posts/schemas/post.schema';

@Injectable()
export class PostsRepository extends AbstractRepository<Post> {
  protected readonly logger = new Logger(PostsRepository.name);

  constructor(
    @InjectModel(Post.name) postModel: Model<Post>,
    @InjectConnection() connection: Connection,
  ) {
    super(postModel, connection);
  }

  async updateOne(
    filterQuery: FilterQuery<Post>,
    updateQuery: UpdateQuery<Post>
  ): Promise<boolean> {
    const result = await this.model.updateOne(filterQuery, updateQuery);
    return result.modifiedCount > 0;
  }
}