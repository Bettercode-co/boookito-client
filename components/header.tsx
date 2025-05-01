'use client'
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') ?? '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const updateSearchQuery = () => {
            if (!searchParams) return;
            const newSearchParams = new URLSearchParams(searchParams.toString());
            if (debouncedSearchTerm) {
                newSearchParams.set('search', debouncedSearchTerm);
            } else {
                newSearchParams.delete('search');
            }
            router.push(`?${newSearchParams.toString()}`);
        };

        updateSearchQuery();
    }, [debouncedSearchTerm, router, searchParams]);

    return <>
        {/* Header stays the same */}
        <header className="bg-white h-14 lg:py-6 py-8 shadow-sm flex items-center px-6 sticky top-0 z-20">
            <div className="font-bold text-lg text-black">
               <Link href="/">
               <img className="w-10" src="./images/logo.svg" alt="" />
               </Link>
            </div>
        </header>
        <div className="relative">
            <div className="fixed top-14 w-full lg:w-auto md:right-[calc(16rem+2rem)] lg:left-1 left-0 z-10 bg-gray-100 py-4 px-6 md:px-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3.5 lg:py-5 text-gray-600 shadow-sm rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm sm:text-base"
                        placeholder="جست و جو در میان صد ها هزار کتاب"
                    />
                </div>
            </div>
        </div>
    </>;
};

// اضافه کردن هوک useDebounce
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue];
};