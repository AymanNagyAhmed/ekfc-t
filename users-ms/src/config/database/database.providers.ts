import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
      try {
        const dbUrl = `${configService.get<string>('DB_TYPE')}://${
          configService.get<string>('DB_USER')}:${
          configService.get<string>('DB_PASSWORD')}@${
          configService.get<string>('DB_HOST')}:${
          configService.get<string>('DB_PORT')}/${
          configService.get<string>('DB_NAME')}?authSource=${
          configService.get<string>('DB_NAME')}`;

        const connection = await mongoose.connect(dbUrl, {
          dbName: configService.get<string>('DB_NAME'),
        });
        
        await connection.connection.db.command({ ping: 1 });
        
        console.log('Successfully connected to MongoDB with URL:', dbUrl);
        console.log(`Database connection established at ${configService.get<string>('DB_HOST')}:${configService.get<string>('DB_PORT')}`);

        return connection;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    }
  }
];
