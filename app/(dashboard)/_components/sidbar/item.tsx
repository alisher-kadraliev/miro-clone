"use client"
import React from 'react'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Image from 'next/image';
import Hint from '@/components/hint';

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

const Item: React.FC<ItemProps> = ({ id, name, imageUrl }: ItemProps) => {
    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()
    const isActive = id === organization?.id
    
    const onClick = () => {
        if (!setActive) return
        setActive({ organization: id })
    }
    return (
        <div className="relative aspect-square">
            <Hint label={name} side="right" align="start" sideOffset={18}  >
                <Image className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-all duration-300", isActive && "opacity-100")} src={imageUrl} alt={name} fill onClick={onClick} />
            </Hint>
        </div>
    )
}

export default Item