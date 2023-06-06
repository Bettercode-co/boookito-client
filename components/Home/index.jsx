// import SingleBook from "./SingleBook";
// import { useEffect, useState } from "react";
// import LoadingScroll from "./LoadingScroll";
// import { AxiosInstance } from "../../utils/http/index";
// import ScrollToTop from "react-scroll-to-top";

// export default function index() {
//   const [book, setBook] = useState([]);
//   const [count, setCount] = useState(0);
//   const [value, setValue] = useState("");
//   const [reesponse, setResponse] = useState([]);
//   const [searchcount, setSearchCount] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [pagesearch, setPageSearch] = useState(0);

//   useEffect(() => {
//     AxiosInstance.get(`/getallbooks?page=${page}`).then(function (response) {
//       setBook([...book, ...response.data.books]);
//       setCount(response.data.totalBooks);
//       setSearchCount(response.data.totalBooks);
//       setLoading(true);
//     });
//   }, [page]);

//   useEffect(() => {
//     AxiosInstance.get(`/getallbooks/${value}`).then(function (res) {
//       setBook(res.data.books);
//       setResponse(res.data);
//       setSearchCount(res.data.Count);
//     });
//   }, [value]);

//   const scrollToEnd = () => {
//     setPage(page + 1);
//   };

//   const books = book.map((element, index) => {
//     return (
//       <SingleBook
//         key={index}
//         source={element.image}
//         bookname={element.bookname}
//         category={element.categoryname}
//         author={element.authorname1}
//         bookcode={element.id}
//       />
//     );
//   });

//   return (
//     <>
//       <ScrollToTop
//         style={{ marginBottom: "40px", alignItems: "center", padding: "6px" }}
//         smooth
//       />

//       <div className="mt-40">
//         <img className="mx-auto w-28" src="/logo.jpg"/>

//         <form>   
//         <label htmlFor="default-search" className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
//         <div className="relative mx-4 mt-6" >
          
//           <input autoComplete="off" type="search" id="default-search" className="block p-5 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="جست و جو در بین بیش از 12 هزار کتاب" required />
//           <button  type="submit" className="text-white left-2.5 bottom-2.5 absolute bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//           <div>
//         <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//         <span className="sr-only">Search</span>
//       </div>
//           </button>
//         </div>
//       </form>
//       </div>
//     </>
//   );
// }
