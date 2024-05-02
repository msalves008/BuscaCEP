import AddressCard from './_components/address-info/address-card'
import { ZipCodeForm } from './_components/search-zip-code/zip-code-form'

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <ZipCodeForm />
        <AddressCard />
      </main>
    </>
  )
}
