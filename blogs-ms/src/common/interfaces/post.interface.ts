import { Document } from 'mongoose';

/**
 * Interface representing a Post document in MongoDB
 * Extends Document to include Mongoose document methods
 */
export interface Post extends Document {
  /**
   * The title of the post
   */
  title: string;
  /**
   * The content of the post
   */
  content: string;
  /**
   * The userID of the post
   */
  userID: string;
  /**
   * Timestamp when the document was created
   */
  createdAt: Date;

  /**
   * Timestamp when the document was last updated
   */
  updatedAt: Date;

}
