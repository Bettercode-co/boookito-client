import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { last_search } from "../../services/search";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "../common/Select";
import { AxiosInstance } from "../../utils/http";
import SingleRowBook from "./SingleRowBook";
import LazyBookComponent from "./LazyBook";

export default function MainComponent() {
  const router = useRouter();
  const isRouterReady = router.isReady
  
  const { bookName, libraryId, pageId, categoryId } = router.query;

  // State variables
  const [currentBookName, setCurrentBookName] = useState(bookName || "");
  const [currentLibraryId, setCurrentLibraryId] = useState(libraryId ? parseInt(libraryId) : null);
  const [currentCategoryId, setCurrentCategoryId] = useState(categoryId ? parseInt(categoryId) : null);
  const [currenPageId, setCurrentPageId] = useState(pageId ? parseInt(pageId) : 1);
  const [currenLoading, setCurrentLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0); // Total number of results from API

  // Dropdown options
  const [libraries, setLibraries] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load libraries on component mount
  useEffect(() => {
    AxiosInstance.get("/home/libraries").then((res) => {
      setLibraries(res.data);
    });
  }, []);

  // Load categories when libraryId changes
  useEffect(() => {
    if (currentLibraryId) {
      AxiosInstance.get(`/home/categories/${currentLibraryId}`)
        .then((res) => setCategories(res.data))
        .catch((e) => console.log(e));
    }
  }, [currentLibraryId]);

  // Fetch books whenever query parameters in the URL change (including pageId)
  useEffect(() => {
    const fetchBooks = async () => {
      setCurrentLoading(true);
      const result = await last_search(currentBookName, currentLibraryId, currenPageId, currentCategoryId);
      setBooks(result);  // Assuming the result contains a 'books' array
      setTotalResults(result.totalResults);  // Assuming the result contains total results info
      setCurrentLoading(false);
    };

    fetchBooks();
  }, [currenPageId, currentBookName, currentLibraryId, currentCategoryId]); // Trigger fetch when any query changes

  // Update query parameters in the URL
  const updateQueryParams = () => {
    const params = new URLSearchParams();
    if (currentBookName) params.append("bookName", currentBookName);
    if (currentLibraryId) params.append("libraryId", currentLibraryId);
    if (currentCategoryId) params.append("categoryId", currentCategoryId);
    params.append("pageId", currenPageId); // Keep current pageId in URL
    router.push(`?${params.toString()}`);
  };

  // Handle changes in form inputs and update query parameters
  const handleSearchChange = () => {
    updateQueryParams();
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(totalResults / 10); // Assuming 10 books per page
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPageId(newPage);
    updateQueryParams();
  };

  return (
    <div className="row">
      <form
        className="md:mb-8 lg:w-2/3 mx-auto flex flex-col md:flex-row md:items-center mb-4 lg:mt-8 mt-1 lg:px-0 sm:px-4"
        onSubmit={(e) => {
          e.preventDefault();
          updateQueryParams(); // When form is submitted, just update the query
        }}
      >
        <Select
          keyName="libraryName"
          items={libraries}
          label={"همه کتابخانه ها"}
          defaultValue={currentLibraryId}
          onChange={(v) => { setCurrentLibraryId(Number(v)); handleSearchChange(); }}
          ClassName="md:w-1/4 text-gray-700 rounded-lg bg-gray-50 border border-gray-300 focus:ring-1 focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
        <Select
          defaultValue={currentCategoryId}
          keyName="categoryName"
          items={categories}
          onChange={(v) => { setCurrentCategoryId(Number(v)); handleSearchChange(); }}
          label={"انتخاب همه دسته ها"}
          ClassName="md:w-1/4 lg:mx-4 mx-0 mt-1 text-gray-700 rounded-lg bg-gray-50 border focus:ring-1 focus:outline-none border-gray-300 focus:ring-green-500 focus:border-green-500"
        />

        <div className="relative mt-1 md:w-3/4 mb-4 md:mb-0">
          <input
            autoComplete="off"
            type="search"
            id="default-search"
            className="py-5 pr-5 pl-10 w-full md:text-base outline-none focus:ring-1 text-sm rounded-lg text-gray-900 bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500"
            placeholder={"جست و جو در بین 40 هزار جلد کتاب"}
            onChange={(e) => { setCurrentBookName(e.target.value); handleSearchChange(); }}
            value={currentBookName}
          />
          <button
            type="submit"
            className="text-white left-2.5 bottom-3 top-3 absolute bg-green-600 font-medium rounded-lg text-sm px-4 py-2"
          >
            <AiOutlineSearch size={20} className="h-auto" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>

      {currenLoading ? (
        <div className="flex items-center justify-center">
          <LazyBookComponent />
        </div>
      ) : (
        <section className="grid md:grid-cols-2 lg:w-2/3 lg:mx-auto bg-white shadow-lg rounded-md p-2 lg:grid-cols-4 2xl:grid-cols-5 sm:grid-cols-3 grid-cols-3">
          {books?.map((value) => (
            <SingleRowBook
              key={value.id}
              imageSource={value.imageSource}
              bookId={value.id}
              categoryName={value.subCategory.category.categoryName}
              bookName={value.bookName}
              publisherName={value.publisherName}
            />
          ))}
        </section>
      )}

      {!currenLoading  && (
        <div className="flex justify-center mx-auto my-16">
          {currenPageId > 1 && (
            <button
              onClick={() => handlePageChange(currenPageId - 1)}
              className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-green-600 hover:text-green-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
            >
              قبلی
            </button>
          )}
          {currenPageId  && (
            <button
              onClick={() => handlePageChange(currenPageId + 1)}
              className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-green-600 hover:text-green-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
            >
              بعدی
            </button>
          )}
        </div>
      )}
    </div>
  );
}
