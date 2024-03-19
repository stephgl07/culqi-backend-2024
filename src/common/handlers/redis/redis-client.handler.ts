// redis.service.ts
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisClientService implements OnApplicationShutdown {
  private client: RedisClientType;

  constructor(private configService: ConfigService) {
    this.client = createClient({
      socket: {
        host: this.configService.get('redis').host,
        port: this.configService.get('redis').port,
      },
      password: this.configService.get('redis').password,
    });
    this.client.connect();
  }

  getClient(): RedisClientType {
    return this.client;
  }

  async onApplicationShutdown() {
    await this.client.disconnect();
  }
}
