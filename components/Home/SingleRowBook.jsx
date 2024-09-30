import Link from "next/link";
import BlurImage from "../Lazy/BlurImage";
import React from "react";
import { GrFormView, GrView } from "react-icons/gr";
import { FiPenTool } from "react-icons/fi";
import Pn from "persian-number";
import Image from "next/image";
const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

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
                <Image
                  src={props.imageSource}
                  alt="book not loaded"
                  width={500}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                  height={500}
                  style={{
                    objectFit: "contain",
                  }}
                  placeholder="blur"
                  blurDataURL="YOUR_GENERATED_BLURHASH_STRING"
                  quality={1}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </a>
            </Link>
          </div>
          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap ">
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
            <div className="text-sm text-gray-600 truncate  h-12 mt-1">
              {props.publisherName}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
