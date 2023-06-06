import React from 'react'

export default function SingleComment({ fullname, time, comment, image }) {

  return (
   
    <>
     <div className="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
        <div className="flex flex-row md-10">
          <img className="w-8 h-8 border-2 border-gray-300 rounded-full" alt="Anonymous's avatar" src={image} />
          <div className="flex-col mt-1">
            <div className="flex items-center flex-1 px-4 font-bold text-xs leading-tight">{fullname}
              <span className="ml-2 text-xs font-normal text-gray-500">3 days ago</span>
            </div>
            <div className="flex-1 px-2 ml-2 text-xs font-medium leading-loose text-gray-600">
              {comment}
            </div>
            
        
          </div>
        </div>
      </div>
    </>
   
  )
}
