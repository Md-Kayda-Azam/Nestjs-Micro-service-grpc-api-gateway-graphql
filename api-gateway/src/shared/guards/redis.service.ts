import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = createClient({
      url: 'redis://localhost:6379', // আপনার Redis সার্ভার URL
    });
    this.client
      .connect()
      .catch((err) => console.error('Redis connection error:', err));
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.setEx(key, ttl, value);
  }
}
