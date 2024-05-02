'use server'
import { prisma } from '@/services/database'

export const getSearchedZipCodes = async () => {
  const searchedZipCodes = await prisma.address.findMany()
  return searchedZipCodes.map((item) => ({
    cep: item.zipCode,
    state: item.state,
    city: item.city,
    neighborhood: item.neighborhood,
    street: item.street,
  }))
}
