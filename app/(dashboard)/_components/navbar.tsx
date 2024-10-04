"use client";

import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';
import React from 'react'
import SeachInput from './search-input';

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-5 gap-x-4 ">
            <div className="hidden lg:flex lg:flex-1">
                <SeachInput />
            </div>
            <div className='block lg:hidden '>
                <OrganizationSwitcher
                    hidePersonal
                />
            </div>
            <UserButton />
        </div>
    )
}

export default Navbar