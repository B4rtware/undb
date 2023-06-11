import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis-health'
import { Controller, Get } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { HealthCheck, HealthCheckService, HealthIndicatorFunction } from '@nestjs/terminus'
import Redis from 'ioredis'
import { InjectCacheStorageConfig, cacheStorageConfig } from '../configs/cache-storage.config.js'
import { StorageHealthIndicator } from '../storage/storage.health.js'

@Controller('health')
export class HealthController {
  redis: Redis | undefined
  constructor(
    private readonly health: HealthCheckService,
    private readonly storageHealth: StorageHealthIndicator,
    private readonly redisIndicator: RedisHealthIndicator,
    @InjectCacheStorageConfig() private readonly cacheConfig: ConfigType<typeof cacheStorageConfig>,
  ) {
    if (cacheConfig.provider === 'redis') {
      console.log(cacheConfig.redis)
      this.redis = new Redis({
        host: cacheConfig.redis.host,
        password: cacheConfig.redis.password,
        port: cacheConfig.redis.port,
        connectTimeout: 10000,
      })
    }
  }

  get healthIndicators(): HealthIndicatorFunction[] {
    const indicators: HealthIndicatorFunction[] = [() => this.storageHealth.isHealthy()]
    if (this.cacheConfig.provider === 'redis') {
      indicators.push(() =>
        this.redisIndicator.checkHealth('cache-storage-redis', { client: this.redis!, type: 'redis' }),
      )
    }

    return indicators
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check(this.healthIndicators)
  }
}
