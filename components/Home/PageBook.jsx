import React, { useEffect, useState } from "react";
import { HiOutlineQrcode } from "react-icons/hi";
import Link from "next/link";
import { IoArrowBack, IoLibraryOutline } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { AxiosInstance } from "../../utils/http";
import { useRouter } from "next/router";
import { MdOutlineEventAvailable, MdOutlineTranslate } from "react-icons/md";
import { BsPencil, BsShare } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css";
import { AiOutlineAccountBook } from "react-icons/ai";

export default function PageBook({ id }) {
  const [allbooks, setBook] = useState({});
  const router = useRouter();
  useEffect(() => {
    AxiosInstance.get(`/home/books/${id}`)
      .then(function (response) {
        setBook(response.data.result);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="pt-12 pb-24 bg-greenGray-100 rounded-b-10xl overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4"></div>
            <div className="w-full  lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="flex  -mx-4 flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center">
                <div className="w-full  sm:w-9/12 px-4">
                  <img
                    className="mb-5 rounded-lg"
                    src={allbooks.imageSource}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-md mb-6">
                <span className="text-xs text-gray-500 dark:text-gray-100 font-bold tracking-wider">
                  دسته بندی #{allbooks?.subCategory?.category?.categoryName}
                </span>
                <h2 className="mt-6 mb-4 font-bold text-gray-600 text-2xl dark:text-white md:text-7xl lg:text-2xl font-heading ">
                  {allbooks.bookName}
                </h2>
                <p className="flex items-center mb-6">
                  <span className="mr-2 text-md text-green-500 font-bold">
                    کدکتاب :
                  </span>
                  <span className="text-3xl border-b-2 text-green-500 font-bold">
                    {allbooks.id}
                  </span>
                </p>
                <p className="text-lg text-gray-400 text-justify">
                  کتاب {allbooks.bookName} در حال حاظر در دانشکده{" "}
                  {allbooks?.library?.libraryName} در قفسه {allbooks.shelfName} می باشد و شما با کد کتاب {allbooks.id} میتوانید به صورت حضوری کتاب خود را دریافت کنید
                </p>
              </div>

              <div>
                <h4 className="mb-6 font-heading font-medium">جزییات کتاب </h4>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg text-right font-heading font-medium">
                    نویسندگان : {allbooks?.authorName?.map((value,index)=>{
                      return value
                    })}
                  </h3>
                </button>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg font-heading font-medium">
                    مترجمان : {allbooks?.translatorName?.map((value,index)=>{
                      return value
                    })}
                  </h3>
                </button>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg font-heading font-medium">
                    انتشارات : {allbooks.publisherName}
                  </h3>
                </button>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg font-heading font-medium">
                    تعداد صفحات : {allbooks.numberPage}
                  </h3>
                </button>
                
              </div>

              <div className="flex flex-wrap -mx-2 mb-12 mt-10">
                <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                  <a
                  
                    className="block disabled opacity-50 py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover:bg-green-600 rounded-xl"
                    href="#"
                  >
                    رزرو کردن کتاب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
