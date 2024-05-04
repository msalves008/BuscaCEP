import AddressWrapper from './_components/address-info'
import { ZipCodeForm } from './_components/search-zip-code/zip-code-form'

export default function Home({
  searchParams,
}: {
  searchParams?: {
    zipCode?: string
  }
}) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <ZipCodeForm />
        <AddressWrapper searchParams={searchParams} />
      </main>
    </>
  )
}
