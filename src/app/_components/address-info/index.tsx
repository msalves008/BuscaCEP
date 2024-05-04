import React from 'react'
import AddressCard from './address-card'

export default async function AddressWrapper({
  searchParams,
}: {
  searchParams?: {
    zipCode?: string
  }
}) {
  const zipCode = searchParams?.zipCode || ''

  return <AddressCard zipCode={zipCode} />
}
