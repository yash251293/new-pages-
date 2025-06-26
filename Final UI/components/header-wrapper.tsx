'use client'

import { usePathname } from 'next/navigation'
import Header from "@/components/header"
import CompanyHeader from "@/components/company-header"

export default function HeaderWrapper() {
  const pathname = usePathname()
  const isCompanyPage = pathname?.startsWith('/company-') || pathname === '/browse-professionals' || false

  return isCompanyPage ? <CompanyHeader /> : <Header />
} 