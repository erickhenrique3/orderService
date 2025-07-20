import { kafka } from './kafka'
export const producer = kafka.producer()

export async function startKafka() {
  await producer.connect()
}
