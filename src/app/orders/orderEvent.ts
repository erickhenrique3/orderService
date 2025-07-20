import { producer } from '../../infra/kafka/producter'

export async function publishOrderCreated(evt: {
  orderId: number
  customerId: number
  total: number
  products: Array<{ productId: number; quantity: number; price: number }>
}) {
  await producer.send({
    topic: 'order_created',
    messages: [{ value: JSON.stringify(evt) }],
  })
}
