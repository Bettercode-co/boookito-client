import Link from 'next/link';
import React from 'react'

export default function SingleReserved({ bookname, image, index, expire, returned ,createdAt ,bookId}) {
  function setStatus(){
    switch (returned) {
      case "PENDING":
        return <span className=" text-orange-500 border   border-orange-500 text-sm font-medium  px-3 py-0.5 rounded  ">انتظار تایید</span> 
        break;
    
        case "ACTIVE":
          return   <span className=" text-green-600 border  border-green-500 text-sm font-medium  px-3 py-0.5 rounded  ">امانت فعال </span> 
          break;


          case "REJECT":
            return <span className=" text-red-500 border  border-red-500 text-sm font-medium  px-3 py-0.5 rounded ">رد شده</span> 
            break;

            case "CLOSED":
            return <span className=" text-sky-500 border  border-sky-500 text-sm font-medium  px-3 py-0.5 rounded ">تحویل داده شده</span> 
            break;
    }
  }
  return (
    
    <li key={index} className=" py-10  sm:py-4">
      <div className="flex items-center ">
        <div className="flex-shrink-0">
        <Link
                    href={{ pathname: "/book/[id]" }}
                    as={`/book/${bookId}`}
                  >
                    <a>
          <img className="w-20 h-28 rounded-sm" src={image} alt="Neil image" />
          </a>
          </Link>

        </div>
        <div className="flex-1 min-w-0 pr-4">
        <Link
                    href={{ pathname: "/book/[id]" }}
                    as={`/book/${bookId}`}
                  >
                    <a>
          <p className="text-sm font-medium text-gray-900 truncate ">
            {bookname}
          </p>
          </a>
          </Link>
          <p className="text-xs mt-3 font-medium text-gray-700 truncate ">
           کد کتاب : {bookId}
          </p>
          <p dir='ltr' className=" text-xs mt-3 font-medium text-gray-900 truncate ">
            {expire}: تاریخ امانت کتاب 
          </p>
       
          <p dir='ltr' className=" text-xs mt-3 font-medium text-gray-900 truncate ">
            {createdAt}: موعد تحویل 
          </p>

        </div>
        <div className="hidden md:block justify-items-start float-left mb-5  text-base font-semibold text-gray-900 "> 
        {setStatus()}
       </div>
      </div>
      <div className="justify-items-start float-left mb-5 md:hidden text-base font-semibold text-gray-900 "> 
        {setStatus()}
      </div>

      
       
    </li>
    
  )
}