'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatAuthors, formatTranslators, getBookDetails } from '../../../services/library'
import {Chip} from "@heroui/chip";


interface BookDetails {
    id: number;
    bookName: string;
    imageSource: string;
    authorName: string[];
    translatorName: string[];
    categoryName: string;
    publisherName: string;
    numberPage: number;
    shabak: string;
    yearPublish: number;
    library: {
        id: number;
        libraryName: string;
    };
    subCategory: {
        id: number;
        name: string;
    };
}

export default function BookPage() {
    const params = useParams();
    const router = useRouter();
    const [book, setBook] = useState<BookDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const toFarsiNumber = (n: number | string): string => {
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return n.toString().replace(/\d/g, x => farsiDigits[parseInt(x)]);
    };
    

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (!params?.id) {
                setLoading(false);
                return;
            }
            
            try {
                const bookData = await getBookDetails(Number(params.id));
                setBook(bookData);
            } catch (error) {
                console.error('خطا در دریافت اطلاعات کتاب:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [params?.id]);

    if (loading) {
        return (
            <main className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
                </div>
            </main>
        );
    }

    if (!book) {
        return (
            <main className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl text-gray-800">کتاب مورد نظر یافت نشد</h1>
                </div>
            </main>
        );
    }

    return (
       <>
           <main className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto overflow-x-hidden">
            <div className="mb-4 md:mb-8 mt-20 lg:mt-20">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-4 w-4 md:h-5 md:w-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    بازگشت به صفحه قبل
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                <div className="md:col-span-1 lg:col-span-1 flex justify-center">
                    <img
                        src={book?.imageSource?.startsWith('http') ? book.imageSource : `/${book?.imageSource?.replace(/^\/+/, '')}`}
                        alt={book?.bookName || 'تصویر کتاب'}
                        className="w-64 sm:w-80 lg:w-full h-auto object-cover rounded-lg shadow-md aspect-[2/3]"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "images/no_cover.gif";
                        }}
                    />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">
                        {book.bookName}
                    </h1>
                    <p className="text-sm md:text-md leading-6 md:leading-8 -tracking-[1 em] text-gray-600 mb-4">
                        {formatAuthors(book.authorName)}
                    </p>

                    <div className="mb-4 md:mb-6 w-full">
                        <Chip 
                            radius="sm" 
                            size='lg' 
                            className='bg-[#3e3e45] text-white text-sm md:text-base w-full' 
                            variant="shadow"
                        >
دریافت حضوری کتاب با کد {toFarsiNumber(book.id)} در کتابخانه دانشگاه {book.library.libraryName}
                        </Chip>
                    </div>

                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 py-4 md:py-6">
                        {book.translatorName && book.translatorName.length > 0 && book.translatorName[0] !== '' && (
                            <div>
                                <span className="font-medium text-gray-700 block text-xs md:text-sm mb-1">
                                    مترجم:
                                </span>
                                <p className="text-gray-500 text-sm md:text-base">{formatTranslators(book.translatorName)}</p>
                            </div>
                        )}
                        <div>
                            <span className="font-medium text-gray-800 block text-xs md:text-sm mb-1">
                                دسته‌بندی:
                            </span>
                            <p className="text-gray-600 text-sm md:text-base">{book.subCategory.name}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700 block text-xs md:text-sm mb-1">
                                انتشارات:
                            </span>
                            <p className="text-gray-500 text-sm md:text-base">{book.publisherName}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center">
                            <svg
                                className="h-3 w-3 md:h-4 md:w-4 ml-1.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                />
                            </svg>
                            <span>{toFarsiNumber(book.numberPage)} صفحه</span>
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="h-3 w-3 md:h-4 md:w-4 ml-1.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                />
                            </svg>
                            <span>سال انتشار: {toFarsiNumber(book.yearPublish)}</span>
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="h-3 w-3 md:h-4 md:w-4 ml-1.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                                />
                            </svg>
                            <span>شابک: {toFarsiNumber(book.shabak)}</span>
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="h-3 w-3 md:h-4 md:w-4 ml-1.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 6.75V18a2.25 2.25 0 002.25 2.25H6A2.25 2.25 0 008.25 18V6.75M8.25 6.75V18M8.25 6.75H6m2.25 0h2.25M12.75 6.75V18a2.25 2.25 0 002.25 2.25H18A2.25 2.25 0 0020.25 18V6.75M12.75 6.75H15M12.75 6.75H10.5"
                                />
                            </svg>
                            <span>کتابخانه: دانشگاه {book.library.libraryName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
       </>
    );
}