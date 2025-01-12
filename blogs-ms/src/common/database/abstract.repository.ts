import { Logger } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from '@/common/database/abstract.schema';
import { ResourceNotFoundException } from '@/common/exceptions/resource-not-found.exception';
import { UnauthorizedException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  /**
   * Creates a new document in the database
   * @param document The document to create
   * @param options Optional save options
   * @returns The created document
   */
  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  /**
   * Updates a single document in the database
   * @param filterQuery The filter query to find the document
   * @param update The update to apply
   * @returns The updated document
   * @throws NotFoundException if document not found
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      const document = await this.model.findOneAndUpdate(
        filterQuery,
        update,
        {
          lean: true,
          new: true,
          runValidators: true,
        }
      );

      if (!document) {
        this.logger.warn(`Document not found with filterQuery:`, filterQuery);
        throw new ResourceNotFoundException('Document');
      }

      return document as unknown as TDocument;
    } catch (error) {
      this.logger.error('Error in findOneAndUpdate:', error);
      throw error;
    }
  }

  /**
   * Finds a single document in the database
   * @param filterQuery The filter query to apply
   * @returns The found document
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      return null;
    }

    return document as unknown as TDocument;
  }

  
  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    const document = await this.model.findOneAndDelete(filterQuery, {
      lean: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new ResourceNotFoundException('Document');
    }

    return document;
  }

  /**
   * Upserts a document in the database
   * @param filterQuery The filter query to apply
   * @param document The document to upsert
   * @returns The upserted document
   */
  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  /**
   * Finds multiple documents in the database
   * @param filterQuery The filter query to apply
   * @returns The found documents
   */
  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  /**
   * Starts a transaction on the database connection
   * @returns The transaction session
   */
  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}