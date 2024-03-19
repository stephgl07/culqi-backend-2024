import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CardModule } from './core/card/card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './common/repositories/repository.module';
import { TraceIdMiddleware } from './common/handlers/http/trace-id.middleware';
import { configLoader } from 'config/env.config';
import { envSchema } from 'config/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     //uri: `mongodb+srv://${configService.get('mongoDb.username')}:${configService.get('mongoDb.password')}@${configService.get('mongoDb.host')}/${configService.get('mongoDb.database')}?authSource=${configService.get('mongoDb.authSource')}&replicaSet=${configService.get('mongoDb.replicaSet')}&readPreference=${configService.get('mongoDb.readPreference')}&ssl=${configService.get('mongoDb.ssl')}`,
    //     uri: 'mongodb://mongo:27017/creditcards'
    //   }),
    //   inject: [ConfigService],
    // }),
    RepositoryModule,
    CardModule,
    ConfigModule.forRoot({
      load: [configLoader],
      isGlobal: true,
      validationSchema: envSchema
    })
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
