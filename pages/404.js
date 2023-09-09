import Link from "next/link"
export default function Custom404() {
    return (


        
    <div className="flex items-center justify-center w-screen md:w-full h-screen">
    <div className="px-4 lg:py-12">
      <div className="lg:gap-4 lg:flex">
        <div
          className="flex flex-col items-center justify-center md:py-24 lg:py-32"
        >
          <h1 className="font-bold text-green-600 text-9xl">404</h1>
          <p
            className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-gray-400 md:text-3xl"
          >
            <span className="text-red-500">وای!</span> این صفحه وجود ندارد
          </p>
          <p className="mb-8 text-center text-gray-500 md:text-lg dark:text-gray-300">
            ممکن است به صفحه اشتباهی هدایت شده باشید
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
            src="https://miro.medium.com/v2/resize:fit:1400/1*zE2qnVTJehut7B8P2aMn3A.gif"
            alt="img"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>

    )

 
  }