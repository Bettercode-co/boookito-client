import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/http";
import { useRouter } from "next/router";
import LazyBookComponent from './LazyBook'

import Pn from "persian-number";
import Head from "next/head";


export default function PageBook({ id }) {
  const [allbooks, setBook] = useState({});
  const router = useRouter();
  const [loading,setLoading] =useState(true)
  useEffect(() => {
    AxiosInstance.get(`/home/books/${id}`)
      .then(function (response) {
        setBook(response.data.result);
        setLoading(false)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  return (
    <>
   

    
    {loading ? <LazyBookComponent/>  :   <section className="pt-12 pb-24 bg-greenGray-100 rounded-b-10xl overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4"></div>
            <div className="w-full  lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="flex  -mx-4 flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center">
                <div className="w-full  sm:w-9/12 px-4">
                  <img
                    className="mb-5 rounded-lg "
                    src={allbooks.imageSource}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-md mb-6">
                <span className="text-xs text-gray-500  font-bold tracking-wider">
                  دسته بندی <span className="bg-green-600 text-white p-1 rounded-md font-normal">#{allbooks?.subCategory?.name}</span>
                </span>
                <h2 className="mt-6 mb-4 font-bold text-gray-600 text-2xl  md:text-7xl lg:text-2xl font-heading ">
                  {allbooks.bookName}
                </h2>
                <p className="flex items-center mb-6">
                  <span className="mr-2 text-md text-green-600 font-bold">
                    کدکتاب :
                  </span>
                  <span className="text-3xl border-b-2 text-green-600 font-bold">
                     {Pn.convertEnToPe(allbooks.id)}
                  </span>
                </p>
                <p className="text-lg text-gray-400 text-justify">
                  کتاب {allbooks.bookName} در حال حاظر در دانشکده{" "}
                  {allbooks?.library?.libraryName} در قفسه {allbooks.shelfName} می باشد و شما با کد کتاب {Pn.convertEnToPe(allbooks.id)} میتوانید به صورت حضوری کتاب خود را دریافت کنید
                </p>
              </div>

              <div>
                <h4 className="mb-6 text-gray-700 font-semibold font-heading ">جزییات کتاب :</h4>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg text-gray-700 text-right font-heading font-medium">
                    نویسندگان : {allbooks?.authorName?.map((value,index)=>{
                      return value+" "
                    })}
                  </h3>
                </button>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg text-gray-700 font-medium text-right font-heading ">
                    مترجمان : {allbooks?.translatorName?.map((value,index)=>{
                      return value+" "
                    })}
                  </h3>
                </button>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg text-gray-700 font-medium text-right font-heading ">
                    انتشارات : {allbooks.publisherName}
                  </h3>
                </button>
                <button className="flex w-full md:w-2/3 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-greenGray-200 hover:border-greenGray-300">
                  <h3 className="text-lg font-heading text-gray-700 font-medium">
                    تعداد صفحات : {Pn.convertEnToPe(allbooks.numberPage)}
                  </h3>
                </button>
                
              </div>

              <div className="flex flex-wrap -mx-2 mb-12 mt-10">
                <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                  <a
                  
                    className="block disabled opacity-50 py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover:bg-green-600 rounded-xl"
                    
                  >
                    {allbooks.totalEntity >0 ? <span className="font-semibold text-black">کتاب موجود است و میتوانید حضوری کتاب را امانت بگیرید</span> : <span className="text-black font-semibold">کتاب در حال حاظر توسط شخص دیگری به امانت گرفته شده است</span>}


                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    <div id="pos-article-display-93620"></div>
    </>
  );
}
