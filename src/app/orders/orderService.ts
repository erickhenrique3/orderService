import { CreateOrderInput } from './orderSchema'
import { createOrderRepo } from './orderRepository'
import { publishOrderCreated } from './orderEvent'

export async function createOrderService(input: CreateOrderInput) {
  const order = await createOrderRepo(input)

  await publishOrderCreated({
    orderId: order.id,
    customerId: input.customerId,
    total: input.total,
    products: input.products,
  })

  return order
}
