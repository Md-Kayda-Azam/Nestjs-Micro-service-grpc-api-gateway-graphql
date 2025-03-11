import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      username: process.env.REDIS_USERNAME || 'default', // ডিফল্ট মান হিসেবে 'default'
      password:
        process.env.REDIS_PASSWORD || 'JoV5losH7i5aSbV8tgJSQrIrIzyz2aQq', // ডিফল্ট পাসওয়ার্ড
      host:
        process.env.REDIS_HOST ||
        'redis-19848.c52.us-east-1-4.ec2.redns.redis-cloud.com',
      port: 19848,
      // tls: {
      //   // Redis Cloud-এর জন্য TLS সক্ষম করা
      //   rejectUnauthorized: false, // উৎস্যানুচিত নয়, প্রোডাকশনে সঠিক সার্টিফিকেট ব্যবহার করুন
      // },
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });
  }

  async onModuleInit() {
    try {
      await this.client.ping();
      console.log('Redis Connected Successfully');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw new Error('Redis connection failed');
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('Redis Disconnected');
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async setJson(key: string, value: any, ttl?: number): Promise<void> {
    const stringifiedValue = JSON.stringify(value);
    await this.set(key, stringifiedValue, ttl);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const value = await this.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }
}

// import { createClient } from 'redis';

// export async function connectRedis() {
//   const client = createClient({
//     username: 'default',
//     password: 'JoV5losH7i5aSbV8tgJSQrIrIzyz2aQq',
//     socket: {
//       host: 'redis-19848.c52.us-east-1-4.ec2.redns.redis-cloud.com',
//       port: 19848,
//     },
//   });

//   client.on('error', (err) => console.log('Redis Client Error:', err));

//   await client.connect();
//   console.log('✅ Connected to Redis');

//   await client.set('foo', 'bar');
//   const result = await client.get('foo');
//   console.log('Redis Value:', result); // >>> bar

//   // Redis ক্লায়েন্ট বন্ধ করতে চাইলে:
//   await client.disconnect();
// }

// // // ফাংশন কল করুন
// // connectRedis();
