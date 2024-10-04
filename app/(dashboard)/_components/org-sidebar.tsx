"use client"; 

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { OrganizationSwitcher } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
const OrgSidebar = () => {
    const searchParams = useSearchParams()
    const favorite = searchParams.get("favorite")
  return (
      <div className="hidden lg:flex flex-col space-y-6 w-[203px] pl-5 pt-5">
          <Link href="/" className='cursor-pointer'>
              <div className="flex items-center gap-x-2 cursor-pointer">
                  <Image src="/logo.png" alt="logo" className="w-28 h-auto cursor-pointer" width={60} height={60} />
              </div>
          </Link>
          <OrganizationSwitcher
              hidePersonal
          />
          <div className='w-full space-y-1'>
              <Button asChild size="lg" variant="ghost" className='w-full px-2 justify-start'>
                  <Link href="/">
                      <LayoutDashboard className='w-4 h-4 mr-2' />
                      Teams Board
                  </Link>
              </Button>
              <Button asChild size="lg" variant={favorite ? "secondary" : "ghost"} className='w-full px-2 justify-start'>
                  <Link href={{
                      pathname: "/",
                      query: {
                          favorite: true
                      }
                  }}>
                      <Star className='w-4 h-4 mr-2' />
                      Favorite Board
                  </Link>
              </Button>
          </div>
    </div>
  )
}

export default OrgSidebar