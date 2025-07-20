import { Kafka } from 'kafkajs'
import { env } from '../../core/env'

export const kafka = new Kafka({
  clientId: 'order-service',
  brokers: env.KAFKA_BROKERS.split(','),
})