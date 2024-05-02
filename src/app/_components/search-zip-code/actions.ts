'use server'
import { prisma } from '@/services/database'
import { AddressInfo } from '../address-info/type'

export const getAddresses = async (zipCode: string) => {
  const address = await prisma.address.findUnique({
    where: {
      zipCode,
    },
  })
  if (!address) {
    return getAddressFromExternalApi(zipCode)
  }
  await prisma.$disconnect()

  return {
    cep: address.zipCode,
    state: address.state,
    city: address.city,
    neighborhood: address.neighborhood,
    street: address.street,
  }
}

export const getAddressFromExternalApi = async (
  zipCode: string,
): Promise<AddressInfo> => {
  console.log('request in ExternalApi', zipCode)
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${zipCode}`,
    )
    if (response.status !== 200) {
      throw new Error('Falha ao buscar informações do CEP.')
    }

    const data = await response.json()
    await saveAddress(data)
    await prisma.$disconnect()

    return {
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
    }
  } catch (error) {
    return Promise.reject(
      new Error('Todos os serviços de CEP retornaram erro.'),
    )
  }
}

export const saveAddress = async (address: AddressInfo) => {
  if (!address.cep) {
    throw new Error('CEP inválido')
  }
  if (await prisma.address.findUnique({ where: { zipCode: address.cep } })) {
    return
  }
  await prisma.address.create({
    data: {
      zipCode: address.cep,
      state: address.state,
      city: address.city,
      neighborhood: address.neighborhood,
      street: address.street,
    },
  })
  await prisma.$disconnect()
}
