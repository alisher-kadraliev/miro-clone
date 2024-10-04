"use client";
import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { SearchIcon } from 'lucide-react';

const SeachInput = () => {
    const router = useRouter();
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 500); // Use the custom hook

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                search: debouncedValue
            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    }, [debouncedValue, router]);

    return (
        <div className='relative w-full'>
            <SearchIcon className='absolute left-3 top-2 text-muted-foreground' />
            <Input value={value} onChange={handleChange} type='text' placeholder='Search board' className='pl-10 max-w-[600px]' />
        </div>
    );
}

// Custom debounce hook
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default SeachInput;