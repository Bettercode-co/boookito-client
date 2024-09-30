import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { last_search } from "../../services/search";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "../common/Select";
import { AxiosInstance } from "../../utils/http";
import SingleRowBook from "./SingleRowBook";

import LazyBookComponent from "./LazyBook";

export default function MainComponent() {
  const router = useRouter(); // new instance for router
  const { bookName, libraryId, pageId, categoryId } = router.query; //Load Params as Query

  //CURRENT STATE

  const [currentBookName, setCurrentBookName] = useState(
    bookName ? bookName : ""
  );

  const [currentLibraryId, setCurrentLibraryId] = useState(
    libraryId ? parseInt(libraryId) : null
  );

  const [currentCategoryId, setCurrentCategoryId] = useState(
    categoryId != undefined ? parseInt(categoryId) : null
  );

  const [currenPageId, setCurrentPageId] = useState(
    pageId != undefined ? parseInt(pageId) : 1
  );

  const [currenLoading, setCurrentLoading] = useState(true);

  const [defaultValueLibrary, setDefaultValueLibrary] = useState(libraryId);

  const [books, setBooks] = useState([]);

  //LOCAL STATE

  const [libraries, SetLibraries] = useState([]);

  const [categories, setCategories] = useState([]);

  //For GetAll Libraries
  useEffect(() => {
    AxiosInstance.get("/home/libraries").then((res) => {
      SetLibraries(res.data);
    });
  }, []);

  //For GetAll Categories For LibraryId
  useEffect(async () => {
    await AxiosInstance.get(`/home/categories/${currentLibraryId}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
  }, [currentLibraryId]);

  //LOGIC SEARCH AND CHANGE ROUTER
  const bookSearch = () => {
    const params = new URLSearchParams();
    const newPageNumber = 1;
    setCurrentPageId(newPageNumber);
    currentBookName && params.append("bookName", currentBookName);
    currentLibraryId && params.append("libraryId", currentLibraryId);
    params.append("pageId", newPageNumber);
    currentCategoryId && params.append("categoryId", currentCategoryId);

    const queryString = params.toString();

    router.push(`?${queryString}`);
  };

  const bookSearchLoadingPrevius = () => {
    const newPageNumber = currenPageId - 1;
    setCurrentPageId(newPageNumber);
    const params = new URLSearchParams();
    currentBookName && params.append("bookName", currentBookName);
    currentLibraryId && params.append("libraryId", currentLibraryId);
    currenPageId && params.append("pageId", newPageNumber);
    currentCategoryId && params.append("categoryId", currentCategoryId);

    const queryString = params.toString();

    router.push(`?${queryString}`);
  };

  const bookSearchLoading = () => {
    const newPageNumber = currenPageId + 1;
    setCurrentPageId(newPageNumber);
    const params = new URLSearchParams();
    currentBookName && params.append("bookName", currentBookName);
    currentLibraryId && params.append("libraryId", currentLibraryId);
    currenPageId && params.append("pageId", newPageNumber);
    currentCategoryId && params.append("categoryId", currentCategoryId);

    const queryString = params.toString();

    router.push(`?${queryString}`);
  };

  //END QUERY STRING RENDER

  useEffect(async () => {
    setBooks([]);
    setCurrentLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { bookName, libraryId, pageId, categoryId } = router.query;
    console.log(router.query);
    setCurrentCategoryId(categoryId);
    setCurrentBookName(bookName);
    setCurrentLibraryId(libraryId);
    setCurrentPageId(parseInt(pageId));
    const result = await last_search(bookName, libraryId, pageId, categoryId);
    setCurrentLoading(false);
    setBooks(result);
  }, [router.query]);

  return (
    <>
      <div className="row">
        
        

        <form
          className="md:mb-8 lg:w-2/3 mx-auto flex flex-col md:flex-row md:items-center mb-4 lg:mt-8 mt-1 lg:px-0 sm:px-4 "
          onSubmit={(e) => e.preventDefault()}
        >
          <Select
            keyName="libraryName"
            items={libraries}
            label={"همه کتابخانه ها"}
            defaultValue={currentLibraryId}
            onChange={(v) => setCurrentLibraryId(Number(v))}
            ClassName={
              "md:w-1/4  text-gray-700 rounded-lg bg-gray-50 border border-gray-300 focus:ring-1 focus:outline-none  focus:ring-green-500 focus:border-green-500  "
            }
          />
          <Select
            defaultValue={currentCategoryId}
            keyName="categoryName"
            items={categories}
            onChange={(v, keyName) => {
              setCurrentCategoryId(Number(v));
            }}
            label={"انتخاب همه دسته ها"}
            ClassName={
              "md:w-1/4 lg:mx-4 mx-0 mt-1 text-gray-700 rounded-lg bg-gray-50 border focus:ring-1 focus:outline-none border-gray-300 focus:ring-green-500 focus:border-green-500 "
            }
          />

          <div className="relative mt-1 md:w-3/4  mb-4 md:mb-0  ">
            <input
              autoComplete="off"
              type="search"
              id="default-search"
              className=" py-5 pr-5 pl-10 w-full md:text-base outline-none focus:ring-1  text-sm rounded-lg text-gray-900 bg-gray-50  border border-gray-300 focus:ring-green-500 focus:border-green-500"
              placeholder={"جست و جو در بین 40 هزار جلد کتاب"}
              onChange={(e) => setCurrentBookName(e.target.value)}
              value={currentBookName}
            />
            <button
              onClick={bookSearch}
              type="submit"
              className=" text-white left-2.5 bottom-3 top-3 absolute bg-green-600  font-medium rounded-lg text-sm px-4 py-2 "
            >
              <div>
                <AiOutlineSearch size={20} className="h-auto" />
                <span className="sr-only">Search</span>
              </div>
            </button>
          </div>
        </form>

        {currenLoading && (
          <div className="flex items-center justify-center ">
            <LazyBookComponent />
          </div>
        )}

        {!currenLoading && (
          <section className="grid md:grid-cols-2 lg:w-2/3 lg:mx-auto bg-white shadow-lg rounded-md p-2 lg:grid-cols-4 2xl:grid-cols-5 sm:grid-cols-3 grid-cols-3">
            {books.map((value, index) => {
              const modifiedImageSource = value.imageSource.replace('https://bookito-data-storage.storage.iran.liara.space/images/', 'https://boookito.storage.ir/');
              return (
                <SingleRowBook
                  key={value.id}
                  imageSource={'/images/nophoto.png'}
                  bookId={value.id}
                  categoryName={value.subCategory.category.categoryName}
                  bookName={value.bookName}
                  publisherName={value.publisherName}
                />
              );
            })}
          </section>
        )}
        <>
          {!currenLoading && (
            <div className="flex justify-center mx-auto my-16">
              {/* Previous Button */}
              {currenPageId > 1 && (
                <button
                  onClick={bookSearchLoadingPrevius}
                  className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-green-600 hover:text-green-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 "
                >
                  قبلی
                </button>
              )}

              <button
                onClick={bookSearchLoading}
                className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-green-600 hover:text-green-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 "
              >
                بعدی
              </button>
            </div>
          )}
        </>
      </div>
    </>
  );
}
