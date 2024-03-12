import Link from "next/dist/client/link";
export default function Custom500() {
  return (
    <div className="flex items-center justify-center w-screen md:w-full h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-500 text-9xl">500</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-gray-400 md:text-3xl">
              <span className="text-red-500">وای!</span> خطا در سرور
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              ممکن است خطایی در سرور رخ داده باشد
            </p>
            <Link href="/">
              <a className="px-6 py-2 text-sm font-semibold rounded-lg w-40 text-center text-gray-500 bg-blue-100">
                بازگشت به خانه
              </a>
            </Link>
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
}
