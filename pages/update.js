import Link from "next/link";
export default function Custom503() {
  return (
    <div className="flex items-center justify-center w-screen md:w-full h-screen">
    <div className="px-4 lg:py-12">
      <div className="lg:gap-4 lg:flex">
        <div
          className="flex flex-col items-center justify-center md:py-24 lg:py-32"
        >
          <h1 className="font-bold text-green-600 text-9xl">500</h1>
          <p
            className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-gray-400 md:text-3xl"
          >
            <span className="text-red-500">وای!</span> خطا در سرور
          </p>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            ممکن است خطایی در سرور رخ داده باشد  یا در حال به روزرسانی باشیم.بعد از ساعاتی دوباره سرویس برقرار میشود
          </p>
          
          <Link href="/">
         
         <a
            
            className="px-6 py-2 text-sm font-semibold rounded-lg w-40 text-center text-blue-500 bg-green-100"
            >بازگشت به خانه</a
          >
         </Link>
        </div>
        <div className="mt-4">
          <img
            src="https://i.pinimg.com/originals/44/1f/80/441f80178f6e257a8c4803c6ff3c4fc6.gif"
            alt="img"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
  );
}
