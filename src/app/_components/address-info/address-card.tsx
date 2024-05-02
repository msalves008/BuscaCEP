'use client'
import * as React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { AddressInfo } from './type'
import { useSearchParams } from 'next/navigation'
import { getAddresses } from '../search-zip-code/actions'
import Spinner from '@/components/ui/spinner'

const AddressCard: React.FC = () => {
  const searchParams = useSearchParams()
  const zipCode = searchParams.get('zipCode')
  const [address, setAddress] = React.useState<AddressInfo | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(true)
    setError(false)
    if (zipCode) {
      getAddresses(zipCode)
        .then(setAddress)
        .catch((error) => {
          console.error(error)
          setAddress(null)
          setError(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [zipCode])

  if (!zipCode) return null

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Endereço</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Spinner />}
        {address && isLoading === false && (
          <>
            <CardDescription>CEP: {address.cep}</CardDescription>
            <CardDescription>Logradouro: {address.street}</CardDescription>
            <CardDescription>Bairro: {address.neighborhood}</CardDescription>
            <CardDescription>Cidade: {address.city}</CardDescription>
            <CardDescription>Estado: {address.state}</CardDescription>
          </>
        )}
        {error && (
          <CardDescription className="text-red-500 text-center">
            Informe um CEP válido
          </CardDescription>
        )}
      </CardContent>
    </Card>
  )
}

export default AddressCard
