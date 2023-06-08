import Link from "next/link";
export default function Custom503() {
  return (
    <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
      <header className="mb-auto flex justify-center z-50 w-full py-4"></header>
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="block text-7xl font-bold text-green-500 sm:text-9xl dark:text-white">
          503
        </h1>
        <h1 className="block text-2xl font-bold text-white" />
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          سرویس بوکیتو در حال به روزرسانی می باشد
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          این قطعی موقتی می باشد و احتمالا تا یکی دوساعت دیگه سرویس به حالت عادی
          برگردد
        </p>
      </div>
      <footer className="mt-auto text-center py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500"> طراحی توسط bettercode</p>
        </div>
      </footer>
    </div>
  );
}
