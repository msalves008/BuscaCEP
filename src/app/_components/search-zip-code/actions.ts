// get address info by zip code

import { AddressInfo } from '../address-info/type'

// const getAddressInfo: (zipCode: string) => Promise<any> i need Promise<AddressInfo>
export const getAddressInfo = async (zipCode: string): Promise<AddressInfo> => {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${zipCode}`,
    )
    if (response.status !== 200) {
      throw new Error('Falha ao buscar informações do CEP.')
    }
    const data = await response.json()
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
