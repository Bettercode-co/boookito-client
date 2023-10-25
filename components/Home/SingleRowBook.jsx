import Link from "next/link";
import BlurImage from "../Lazy/BlurImage";
import React from "react";
import { GrFormView, GrView } from "react-icons/gr";
import { FiPenTool } from "react-icons/fi";
import Pn from "persian-number";

export default function SingleRowBook(props) {
  return (
    <React.Fragment>
      
      <div className="flex flex-col gap-3 justify-center    my-3">
              <div className="lg:w-4/5 w-5/6 mx-auto">
                <div className="relative h-40 w-full mb-3">
                  <div className="absolute flex flex-col top-0 right-0 p-3"></div>
                  <Link
                    href={{ pathname: "/book/[id]" }}
                    as={`/book/${props.bookId}`}
                  >
                    <a>
                      <img
                        loading="eager"
                        src={props.imageSource}
                        alt="Just a flower"
                        className=" w-96 lg:h-48 h-full  object-fill  rounded-md"
                      />
                    </a>
                    
                  </Link>
                  
                </div>
                <div className="flex-auto justify-evenly">
                  <div className="flex flex-wrap ">
                    <div className="w-full flex-none text-sm flex items-center text-gray-600">
                      <GrFormView size={20} />
                      <span className="text-gray-400 whitespace-nowrap mr-3">
                        +
                        {props.seen == 0
                          ? Pn.convertEnToPe(Math.floor(Math.random() * 42))
                          : Pn.convertEnToPe(props.seen)}
                        K
                      </span>
                    </div>
                    <div className="flex items-center w-full justify-between min-w-0 my-1 ">
                      <Link
                        href={{ pathname: "/book/[id]" }}
                        as={`/book/${props.bookId}`}
                      >
                        <a className="text-sm  text-right cursor-pointer text-gray-700 font-bold hover:text-purple-500 truncate ">
                          {props.bookName}
                        </a>
                      </Link>
                      
                    </div>
                    
                  </div>
                  <div className="text-sm text-gray-600   h-12 mt-1">
                    {props.publisherName}
                  </div>

                
                </div>
              </div>
            </div>
    </React.Fragment>
  );
}
