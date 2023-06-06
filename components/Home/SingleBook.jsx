import React from 'react'
import Link from "next/link"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SingleBook({ bookname, bookcode, category, source }) {
  
  return (


    <>

      <div className=" w-44 my-2 ">


        <Link href={{ pathname: "/book/[id]" }} as={`/book/${bookcode}`}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {source ? <img className="w-full h-full" src={source} alt="Sunset in the mountains" loading='lazy' /> : <Skeleton height={120} />}
            <div className="px-1 text-right py-4 h-[80px]">
           
                <div className="font-medium  text-sm mb-2 text-justify">{bookname || <Skeleton count={2} />}</div>
            </div>
            <div className="w-full mt-6 ">
              <span className="w-full block bg-gray-200   py-1 text-[12px]  text-gray-700 text-center ">{category || <Skeleton />}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
