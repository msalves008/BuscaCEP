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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormData, zipCodeSchema } from './schema'
import { Button } from '@/components/ui/button'

export function ZipCodeForm() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zipCodeSchema),
    defaultValues: {
      zipCode: searchParams.get('zipCode')?.toString() ?? '',
    },
  })

  function handleSetZipToSearchParams(data: FormData) {
    const params = new URLSearchParams(searchParams)
    if (data.zipCode) {
      params.set('zipCode', data.zipCode)
    } else {
      params.delete('zipCode')
    }
    replace(`${pathname}?${params.toString()}`)
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
            <Label htmlFor="zipCode">CEP</Label>
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <Input
                  id="zipCode"
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
          <Button type="submit" className=" w-full">
            Buscar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
