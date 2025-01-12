import { AbstractDocument } from '@/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false
})
export class Post extends AbstractDocument {

  @Prop({
    required: true,
    minlength: 6
  })
  title: string;

  @Prop({
    required: true,
    type: String
  })
  content: string;

  @Prop({
    required: true,
    type: String,
    index: true,
    immutable: true
  })
  userId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
