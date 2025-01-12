import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from '@/common/interfaces/database-config.interface';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbConfig: DatabaseConfig = {
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('DB_NAME'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
        };

        const uri = `${dbConfig.type}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=${dbConfig.database}`;
        
        return {
          uri,
          dbName: dbConfig.database,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('Successfully connected to MongoDB:');
              console.log(`Database: ${dbConfig.database}`);
              console.log(`Host: ${dbConfig.host}:${dbConfig.port}`);
            });

            connection.on('error', (error) => {
              console.error('MongoDB connection error:', error);
            });

            connection.on('disconnected', () => {
              console.log('MongoDB disconnected');
            });

            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
