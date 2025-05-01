export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">صفحه مورد نظر یافت نشد</p>
                <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    بازگشت به صفحه اصلی
                </a>
            </div>
        </main>
    );
} 