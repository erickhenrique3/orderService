import { prisma } from '@/infra/db/cliente'
import type { Prisma } from '../../../generated/prisma'

type CreateOrderInput = {
  customerId: number
  total: number
  products: Array<{
    productId: number
    quantity: number
    price: number
  }>
}

export async function createOrderRepo(data: CreateOrderInput) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const order = await tx.order.create({
      data: {
        customerId: data.customerId,
        total: data.total,
      },
    })

    const orderItems = data.products.map((product) => ({
      orderId: order.id,
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
    }))

    await tx.orderItem.createMany({ data: orderItems })

    return order
  })
}
