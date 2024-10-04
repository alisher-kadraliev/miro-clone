"use client";

import { CreateOrganization } from '@clerk/nextjs';
import {
    Dialog,
    DialogContent, DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import Hint from '@/components/hint';

const NewBtn = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="aspect-square">
                    <Hint label="Create a new organization" side="right" align="start" sideOffset={18}  >
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-transparent p-0 border-none max-w-[300px]">
                <CreateOrganization routing="hash" />
            </DialogContent>
        </Dialog>
    )
}

export default NewBtn