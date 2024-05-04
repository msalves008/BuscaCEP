'use client'
import React from 'react'
import { ToggleTheme } from '@/components/theme/toggle-theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathName = usePathname()

  return (
    <header className="flex justify-between items-center  px-6 py-4 border-b border-border">
      <div className="flex gap-4">
        <strong>BuscaCEP</strong>
        <span>•</span>
        <Link
          href={pathName === '/' ? '/app' : '/'}
          className="hover:underline"
        >
          {pathName === '/' ? 'Consultar CEPs Buscados' : 'Busca CEP'}
        </Link>
      </div>
      <ToggleTheme />
    </header>
  )
}
