import React from 'react'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
interface FooterCardProps {
    favorite: boolean
    title: string
    authorLable: string
    createdAt: string
    createdAtLabel: string
    onClick: () => void
    disabled: boolean,
}
const FooterCard = ({
    title,
    authorLable,
    createdAt,
    createdAtLabel,
    onClick,
    disabled,
    favorite
}: FooterCardProps) => {
    return (
        <div className='relative bg-white p-2'>
            <p>
                {title}
            </p>
            <p className='text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 text-muted-foreground truncate'>
                {authorLable}, {createdAtLabel}
            </p>
            <Button
                variant='link'
                size='icon'
                onClick={onClick}
                disabled={disabled}
                className={cn('absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-muted-foreground hover:text-yellow-500', disabled && 'opacity-100 cursor-not-allowed')}
            >
                <Star className={cn('w-5 h-5', favorite && 'text-yellow-500 fill-yellow-500')} />
            </Button>
        </div>
    )
}

export default FooterCard