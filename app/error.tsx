'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">خطا</h1>
                <p className="text-xl text-gray-600 mb-8">متأسفانه خطایی رخ داده است</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        بازگشت به صفحه قبل
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        بازگشت به صفحه اصلی
                    </button>
                </div>
            </div>
        </main>
    );
} 