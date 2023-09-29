import Link from "next/link";
import BlurImage from "../Lazy/BlurImage";
import React from "react";
import {GrFormView, GrView} from 'react-icons/gr'
import { FiPenTool } from "react-icons/fi";
import Pn from "persian-number";


export default function SingleRowBook(props) {
  return (
    <React.Fragment>
 
 
 
 <div className="relative m-3  flex flex-col items-center justify-center ">
  <div className="container">
    <div className="max-w-md w-full bg-gray-100 shadow-lg rounded-xl p-6">
      <div className="flex flex-col ">
        <div className="">
          <div className="relative h-62 w-full mb-3">
            <div className="absolute flex flex-col top-0 right-0 p-3">
              <button className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <Link href={{ pathname: "/book/[id]" }} as={`/book/${props.bookId}`}>
           <a >
           <img
           loading="eager"
src={props.imageSource}
alt="Just a flower"
              className=" w-full lg:h-56 h-full  object-fill  rounded-2xl"
            />
           </a>
              </Link>
        
          </div>
          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap ">
              <div className="w-full flex-none text-sm flex items-center text-gray-600">
                <GrFormView size={20}/>
                <span className="text-gray-400 whitespace-nowrap mr-3">
                
                +{props.seen==0 ?  Pn.convertEnToPe(Math.floor(Math.random()*42))   : Pn.convertEnToPe(props.seen)}K
                </span>

              </div>
              <div className="flex items-center w-full justify-between min-w-0 my-1 ">
               
              <Link href={{ pathname: "/book/[id]" }} as={`/book/${props.bookId}`}>

                <a className="text-sm  text-right cursor-pointer text-gray-700 font-bold hover:text-purple-500 truncate " >
                  {props.bookName}
                </a>
                </Link>
                <div className="flex items-center  bg-green-600 text-gray-200 text-xs px-2 py-1 ml-3 rounded-lg">
                  #{props.categoryName}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600   h-12 mt-1">{props.publisherName}</div>
          
          
            <div className="flex space-x-2 text-sm font-medium justify-start mt-5">
            <Link href={{ pathname: "/book/[id]" }} as={`/book/${props.bookId}`}>
       
           
              <a className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-emerald-600 ">
                <span>مشاهده کتاب</span>
              </a>
              
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

     


    </React.Fragment>
  );
}
