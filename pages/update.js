import Link from "next/link";
export default function Custom404() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">متاسفیم!</span> سرویس در حال به
              روزرسانی می باشد
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              احتمالا تا ساعاتی دیگر سرویس به حالت پایدار بر می گردد
            </p>
            <Link href="/">
              <a className="px-6 py-2 text-sm font-semibold rounded-lg w-40 text-center text-blue-500 bg-blue-100">
                بازگشت به خانه
              </a>
            </Link>
          </div>
          <div className="mt-4">
            <img
              src="https://cdn.dribbble.com/users/2520078/screenshots/11988083/media/16914c8400ad518b034fbe8102ba2d4f.gif"
              alt="img"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
