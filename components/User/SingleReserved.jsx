import React from 'react'

export default function SingleReserved({ bookname, image, index, expire, returned }) {
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
            return <span className=" text-sky-500 border  border-sky-500 text-sm font-medium  px-3 py-0.5 rounded ">انجام شده</span> 
            break;
    }
  }
  return (
    
    <li key={index} className=" py-10  sm:py-4">
      <div className="flex items-center ">
        <div className="flex-shrink-0">
          <img className="w-12 h-12 rounded-md" src={image} alt="Neil image" />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {bookname}
          </p>
          <p dir='ltr' className=" text-xs mt-3 font-medium text-gray-900 truncate dark:text-white">
            {expire}: موعد تحویل 
          </p>
          {/* <p className="text-sm py-10 text-gray-500 truncate dark:text-gray-400 pt-2">
            {expire && returned ==0 > 0 ? `${expire} روز دیگر مهلت دارید` : `موعد رزرو شما به اتمام رسیده `}
          </p> */}
        </div>
        <div className="hidden md:block justify-items-start float-left mb-5  text-base font-semibold text-gray-900 dark:text-white"> 
        {setStatus()}
       </div>
      </div>
      <div className="justify-items-start float-left mb-5 md:hidden text-base font-semibold text-gray-900 dark:text-white"> 
        {setStatus()}
      </div>

      
       
    </li>
    
  )
}