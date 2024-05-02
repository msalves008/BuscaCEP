import { ToggleTheme } from '@/components/theme/toggle-theme'
import AddressCard from './_components/address-info/address-card'
import { ZipCodeForm } from './_components/search-zip-code/zip-code-form'

export default function Home() {
  return (
    <>
      <header className="flex justify-between items-center  px-6 py-4 border-b border-border">
        <strong>BuscaCEP</strong>
        <ToggleTheme />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <ZipCodeForm />
        <AddressCard />
      </main>
    </>
  )
}
