'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormData, zipCodeSchema } from './schema'
import { Button } from '@/components/ui/button'

export function ZipCodeForm() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zipCodeSchema),
    defaultValues: {
      zipCode: searchParams.get('zipCode') ?? '',
    },
  })

  function handleSetZipToSearchParams(data: FormData) {
    const query = new URLSearchParams({
      zipCode: data.zipCode,
    })

    return window.history.pushState({}, '', `?${query.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit(handleSetZipToSearchParams)}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Busca CEP</CardTitle>
          <CardDescription>
            Digite o CEP para obter as informações do endereço.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zipcode">CEP</Label>
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <Input
                  id="zipcode"
                  type="text"
                  placeholder="00000-000"
                  maxLength={8}
                  {...field}
                />
              )}
            />
            {errors.zipCode && (
              <p className="text-red-500">{errors.zipCode.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-stretch">
          <Button variant={'outline'} onClick={() => push('/app')}>
            Consultar CEPs buscados
          </Button>
          <Button type="submit" className=" w-full">
            Buscar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
