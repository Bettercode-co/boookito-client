import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
export default function LoadingScroll({ handleClick }) {
  return (
    <React.Fragment>
      <div className="my-14 text-center">
        <button
          onClick={handleClick}
          className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-green-600 hover:text-green-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-600 dark:text-green-600 dark:hover:text-green-400 dark:hover:shadow-slate-700/[.7] dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
        >
          بارگذاری بیشتر
          <FiMoreHorizontal />
        </button>
      </div>
    </React.Fragment>
  );
}
