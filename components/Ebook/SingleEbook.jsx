import React from 'react'

export default function SingleEbook({bookname,authorname,page,publishername,categoryname,linkdownload,translator,year}) {
  return (
    
   <a href="#" className="flex mx-6 flex-col items-center mt-5 bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
   <img className="object-cover w-full h-32 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/logo-pdf.png" alt="" />
   <div className="flex flex-col justify-between p-4 leading-normal">
     <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{bookname}</h5>
     <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{page}</h5>
     <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{categoryname}</h5>

   </div>
 </a>


  )
}
