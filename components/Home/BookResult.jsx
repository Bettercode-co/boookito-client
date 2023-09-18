import React, { useEffect, useRef, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { AxiosInstance } from "../../utils/http";
import Select from "../common/Select";
import LoadingScroll from "./LoadingScroll";
import LogoApplication from "./Logo";
import SingleRowBook from "./SingleRowBook";

export default function BookResult() {
  const [books, setBooks] = useState([]);
  
  
  const [bookName, setBookName] = useState(null);
  const [count, setCount] = useState(null);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState([]);
  const [selectLibrary, selectSetLibrary] = useState(1);

  useEffect(() => {
    AxiosInstance.get("/home/libraries").then((res) => {
      setLibrary(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosInstance.get(`/home/categories/${selectLibrary}`)
      .then((res) => {
        setCategories(res.data);
        setCategoryId(null);
        setSubCategoryId(null);
      })
      .catch((e) => console.log(e));
  }, [selectLibrary]);

  useEffect(() => {
    categoryId &&
      AxiosInstance.get(`/home/subcategories?categoryId=${categoryId}`)
        .then((res) => {
          setSubCategories(res.data);
        })
        .catch((e) => console.log(e));
  }, [categoryId]);

  useEffect(() => {
    if (!subCategoryId && categoryId) {
      AxiosInstance.post(`/home/searchc`, {
        bookName: bookName,
        pageId: page,
        categoryId: categoryId,
        libraryId: selectLibrary,
      })
        .then(function (response) {
          setLoading(false);
          setBooks([...books, ...response.data.result]);
          setCount(response.data.count);
        })
        .catch(function (err) {
          setCount(0);
        });
    } else {
      AxiosInstance.post(`/home/search`, {
        bookName: bookName,
        pageId: page,
        subCategoryId: subCategoryId,
        libraryId: selectLibrary,
      })
        .then(function (response) {
          setBooks([...books, ...response.data.result]);
          setCount(response.data.count);
        })
        .catch(function (err) {
          setCount(0);
        });
    }
  }, [page]);

  useEffect(() => {
    setBooks([]);
    setLoading(true);
    AxiosInstance.post(`/home/search`, {
      bookName: bookName,
      pageId: page,
      subCategoryId: subCategoryId,
      libraryId: selectLibrary,
    })
      .then(function (response) {
        setLoading(false);
        setBooks([...response.data.result]);
        setCount(response.data.count);
      })
      .catch(function (err) {
        setCount(0);
      });
  }, [selectLibrary]);

  useEffect(() => {
    setBooks([]);
    setLoading(true);
    AxiosInstance.post(`/home/search`, {
      bookName: bookName,
      pageId: page,
      subCategoryId: subCategoryId,
      libraryId: selectLibrary,
    })
      .then(function (response) {
        setLoading(false);
        setBooks([...response.data.result]);
        setCount(response.data.count);
      })
      .catch(function (err) {
        setCount(0);
      });
  }, [subCategoryId]);

  useEffect(() => {
    setBooks([]);
    setLoading(true);
    categoryId &&
      AxiosInstance.post(`/home/searchc`, {
        bookName: bookName,
        pageId: page,
        categoryId: categoryId,
        libraryId: selectLibrary,
      })
        .then(function (response) {
          setLoading(false);
          setBooks([...response.data.result]);
          setCount(response.data.count);
        })
        .catch(function (err) {
          setCount(0);
        });
  }, [categoryId]);

  function plusScroll() {
    setPage(page + 1);
  }

  const bookSearch = () => {
    setLoading(true);
    AxiosInstance.post(`/home/search`, {
      bookName: bookName,
      pageId: page,
      subCategoryId: subCategoryId,
      libraryId: selectLibrary,
    })
      .then(function (response) {
        setLoading(false);
        setBooks(response.data.result);
        setCount(response.data.count);
      })
      .catch(function (err) {
        setCount(0);
      });
  };

  if (count > 1) {
    var allbooks = books.map((element, index) => {
      console.log(count);
      return (
        <SingleRowBook
          key={index}
          imageSource={element.imageSource}
          bookId={element.id}
          categoryName={element.subCategory.category.categoryName}
          bookName={element.bookName}
          publisherName={element.publisherName}
          seen={element.seen}
        />
      );
    });
  } else if (count == 0) {
    allbooks = (
      <div className="min-h-[15rem]   flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <svg
            className="max-w-[5rem]"
            viewBox="0 0 375 428"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M254.509 253.872L226.509 226.872"
              className="stroke-gray-400 dark:stroke-white"
              stroke="currentColor"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <path
              d="M237.219 54.3721C254.387 76.4666 264.609 104.226 264.609 134.372C264.609 206.445 206.182 264.872 134.109 264.872C62.0355 264.872 3.60864 206.445 3.60864 134.372C3.60864 62.2989 62.0355 3.87207 134.109 3.87207C160.463 3.87207 184.993 11.6844 205.509 25.1196"
              className="stroke-gray-400 dark:stroke-white"
              stroke="currentColor"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <rect
              x="270.524"
              y="221.872"
              width="137.404"
              height="73.2425"
              rx="36.6212"
              transform="rotate(40.8596 270.524 221.872)"
              className="fill-gray-400 dark:fill-white"
              fill="currentColor"
            />
            <ellipse
              cx="133.109"
              cy="404.372"
              rx="121.5"
              ry="23.5"
              className="fill-gray-400 dark:fill-white"
              fill="currentColor"
            />
            <path
              d="M111.608 188.872C120.959 177.043 141.18 171.616 156.608 188.872"
              className="stroke-gray-400 dark:stroke-white"
              stroke="currentColor"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <ellipse
              cx="96.6084"
              cy="116.872"
              rx={9}
              ry={12}
              className="fill-gray-400 dark:fill-white"
              fill="currentColor"
            />
            <ellipse
              cx="172.608"
              cy="117.872"
              rx={9}
              ry={12}
              className="fill-gray-400 dark:fill-white"
              fill="currentColor"
            />
            <path
              d="M194.339 147.588C189.547 148.866 189.114 142.999 189.728 138.038C189.918 136.501 191.738 135.958 192.749 137.131C196.12 141.047 199.165 146.301 194.339 147.588Z"
              className="fill-gray-400 dark:fill-white"
              fill="currentColor"
            />
          </svg>
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-500">
            کتابی با این عنوان پیدا نشد
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop
        style={{
          marginBottom: "40px",
          alignItems: "center",
          padding: "10px",
          width: "50px",
          height: "50px",
        }}
        smooth={100}
      />

      <div className="row">
        <div className="lg:hidden">
          <LogoApplication />
        </div>

        <form
          className="md:mb-8 flex flex-col md:flex-row md:items-center mb-4 lg:mt-8 mt-1 px-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {" "}
          <Select
            keyName="libraryName"
            items={library}
            onChange={(v) => selectSetLibrary(Number(v))}
            ClassName={
              "md:w-1/4  text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
            }
          />
          <Select
            keyName="categoryName"
            items={categories}
            onChange={(v) => setCategoryId(Number(v))}
            label={"انتخاب همه دسته ها"}
            ClassName={
              "md:w-1/4 lg:mx-4 mx-0 mt-1 text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
            }
          />
          <Select
            keyName="name"
            items={subCategories}
            onChange={(v) => setSubCategoryId(Number(v))}
            label={"انتخاب همه زیر دسته ها"}
            ClassName={
              "md:w-1/4 ml-4 mt-1 text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
            }
          />
          <div className="relative mt-1 md:w-3/4 md:ml-4 mb-4 md:mb-0  ">
            <input
              autoComplete="off"
              type="search"
              id="default-search"
              className=" py-5 pr-5 pl-10 w-full md:text-base text-sm rounded-lg text-gray-900 bg-gray-50  border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="جست و جو در بین بیش از 40 هزار کتاب"
              onChange={(e) => setBookName(e.target.value)}
            />
            <button
              onClick={bookSearch}
              type="submit"
              className=" text-white left-2.5 bottom-2.5 absolute bg-green-600  font-medium rounded-lg text-sm px-4 py-2 "
            >
              <div>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </div>
            </button>
          </div>
        </form>
        {loading && (
          <p className="my-16 bg-gray-50 dark:bg-gray-700 px-6 py-3 rounded-lg w-1/2 mx-auto text-green-600 text-center">
            در حال جستجوی کتاب ...
          </p>
        )}
        <section className="grid md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6 ">
          {!loading && allbooks}
        </section>

        {count >= books.length &&
          count > 1 &&
          !loading &&
          count != allbooks.length && (
            <LoadingScroll handleClick={() => plusScroll()} />
          )}
      </div>
    </>
  );
}
