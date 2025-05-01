'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tooltip } from "@heroui/tooltip";
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toFarsiNumber } from '@/services/number';

interface Pagination {
    total: number;
    pages: number;
    currentPage: number;
    itemsPerPage: number;
}

interface Book {
    id: number;
    title: string;
    imageSource: string;
    bookName: string;
}

interface ApiResponse {
    data: {
        books: Book[];
        pagination: Pagination;
    };
}

export const MainContent = () => {
    const searchParams = useSearchParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        pages: 0,
        currentPage: 1,
        itemsPerPage: 21
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.boookito.ir/api/v2/home/searchbooks/advanced${searchParams ? `?${searchParams}` : ''}`);
                if (!response.ok) {
                    throw new Error('Error receiving information');
                }
                const data: ApiResponse = await response.json();
                setBooks(data.data.books);
                setPagination(data.data.pagination);
            } catch (error) {
                console.error('خطا در دریافت کتاب‌ها:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [searchParams]);

    if (isLoading) {
        return (
            <main className="flex-1 lg:h-screen p-4 md:p-8 pt-20 md:pt-24 md:mr-[calc(16rem+2rem)] flex items-center justify-center">

            </main>
        );
    }

    const createPageUrl = (pageNumber: number): string => {
        if (pageNumber < 1 || pageNumber > pagination.pages) {
            return '';
        }
        
        if (!searchParams) return `?page=${pageNumber}`;
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        
        return `?${params.toString()}`;
    };

    const getNextPageNumber = (): number => {
        const currentPageStr = searchParams?.get('page');
        const currentPage = currentPageStr ? parseInt(currentPageStr, 10) : 1;
        return currentPage + 1;
    };

    const getPrevPageNumber = (): number => {
        const currentPageStr = searchParams?.get('page');
        const currentPage = currentPageStr ? parseInt(currentPageStr, 10) : 1;
        return currentPage - 1;
    };

    return (
        <main className="flex-1 lg:h-screen p-4 md:p-8 pt-20 md:pt-24 md:mr-[calc(16rem+2rem)] flex flex-col">
            <div className="flex-grow">
                {books.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">کتابی یافت نشد</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-5">
                        {books.map((book) => (
                            <Link href={`/book/${book.id}`} key={book.id}>
                                <div className="book-item relative aspect-book-cover">
                                    <Tooltip 
                                        content={book.bookName}
                                        placement="bottom"
                                        color='default'
                                        className="font-iranSansWeb"
                                    >
                                        <img
                                            src={book.imageSource}
                                            alt={book.title || "تصویر کتاب"}
                                            className="w-full lg:h-80 h-32 object-cover rounded border border-gray-200 transition-opacity duration-200 hover:opacity-90"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "images/no_cover.gif";
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Section - همیشه در پایین */}
            <div className="mt-8">
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <Link
                            href={createPageUrl(getPrevPageNumber())}
                            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${getPrevPageNumber() < 1 ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href={createPageUrl(getNextPageNumber())}
                            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${getNextPageNumber() > pagination.pages ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                نمایش{' '}
                                <span className="font-medium">{toFarsiNumber((pagination.currentPage - 1) * pagination.itemsPerPage + 1)}</span>
                                {' '}تا{' '}
                                <span className="font-medium">
                                    {toFarsiNumber(Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.total))}
                                </span>
                                {' '}از{' '}
                                <span className="font-medium">
  {toFarsiNumber(pagination.total.toLocaleString("fa-IR"))}
</span>                                {' '}نتیجه
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="صفحه‌بندی">
                                <Link
                                    href={createPageUrl(getPrevPageNumber())}
                                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${getPrevPageNumber() < 1 ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                                <Link
                                    href={createPageUrl(getNextPageNumber())}
                                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${getNextPageNumber() > pagination.pages ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};