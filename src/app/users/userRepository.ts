import { prisma } from '@/infra/db/cliente'

export const userRepository = {
  async create(data: { email: string; password: string }) {
    return prisma.user.create({ data })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } })
  }
}
