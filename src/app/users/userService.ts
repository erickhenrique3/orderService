// src/app/users/userService.ts
import bcrypt from 'bcryptjs'
import { userRepository } from './userRepository'
import { RegisterInput, LoginInput } from './userSchema'

export const userService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email)
    if (existing) {
      throw new Error('Email já cadastrado')
    }

    const hashed = await bcrypt.hash(input.password, 10)
    const user = await userRepository.create({ email: input.email, password: hashed })
    return { id: user.id, email: user.email, createdAt: user.createdAt }
  },

  async authenticate(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email)
    if (!user) return null

    const valid = await bcrypt.compare(input.password, user.password)
    if (!valid) return null

    return { id: user.id, email: user.email }
  }
}
