'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { AddressInfo } from '@/app/_components/address-info/type'

interface SearchedZipCodesDataTableProps {
  searchedZipCodes: AddressInfo[]
}

export function SearchedZipCodesDataTable({
  searchedZipCodes,
}: SearchedZipCodesDataTableProps) {
  const { push } = useRouter()
  return (
    <Card className="p-4 m-4">
      <CardHeader>
        <CardTitle>CEPs Pesquisados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">CEP</TableHead>
              <TableHead>Logradouro</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedZipCodes?.map((item) => (
              <TableRow key={item.cep}>
                <TableCell className="font-medium">{item.cep}</TableCell>
                <TableCell>{item.street}</TableCell>
                <TableCell>{item.neighborhood}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button onClick={() => push('/')} className="ml-auto">
          Buscar novo CEP
        </Button>
      </CardFooter>
    </Card>
  )
}
