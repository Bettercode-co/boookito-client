import Link from "next/link";
import React from "react";
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
                <img
                  src={props.imageSource== "https://bookito-object-storage.storage.iran.liara.space/nophoto.png" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWSxsVpAmqb_T7CLGolJ193Bw9xh7X7r0yQ&s" : props.imageSource}
                  alt="Just a flower"
                  priority
                  placeholder="blur"
                  className="rounded-md h-40"
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
                  <a className="text-sm  text-right cursor-pointer text-gray-700 font-bold hover:text-green-700 truncate ">
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
