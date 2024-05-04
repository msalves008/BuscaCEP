import * as React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { getAddresses } from '../search-zip-code/actions'
import Spinner from '@/components/ui/spinner'

interface AddressCardProps {
  zipCode?: string
}

const AddressCard = async ({ zipCode }: AddressCardProps) => {
  if (!zipCode) return null

  const address = await getAddresses(zipCode)
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Endereço</CardTitle>
      </CardHeader>
      <CardContent>
        {!address && <Spinner />}
        {address && address?.status !== 404 && (
          <>
            <CardDescription>CEP: {address.cep}</CardDescription>
            <CardDescription>Logradouro: {address.street}</CardDescription>
            <CardDescription>Bairro: {address.neighborhood}</CardDescription>
            <CardDescription>Cidade: {address.city}</CardDescription>
            <CardDescription>Estado: {address.state}</CardDescription>
          </>
        )}
        {address?.status === 404 && (
          <CardDescription className="text-red-500 text-center">
            CEP inválido ou inexistente em nossos registros
          </CardDescription>
        )}
      </CardContent>
    </Card>
  )
}

export default AddressCard
