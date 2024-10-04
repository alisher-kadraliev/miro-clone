import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'

interface HintProps {
    label: string;
    children: React.ReactNode;
    align?: "start" | "center" | "end";
    side?: "top" | "bottom" | "left" | "right";
    sideOffset?: number;
    alignOffset?: number;
}

const Hint = ({ label, children, align, side, sideOffset, alignOffset }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white border-black" side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
                    <p className="font-semibold capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Hint