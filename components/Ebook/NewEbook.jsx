import React from "react";

export default function NewEbook() {
  return (
    <div className="py-20   px-2">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full ">
            <div className="p-4 border-b-2 text-center">
              {" "}
              <span className="text-lg font-bold text-gray-600 ">
                {" "}
                افزودن کتاب PDF
              </span>
            </div>
            <div className="p-3">
              <div className="mb-2">
                {" "}
                <span className="text-sm">نام کتاب</span>
                <input
                  type="text"
                  id="base-input"
                  className="mt-2 text-sm bg-gray-50 border border-gray-300 text-gray-800  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  autoComplete="off"
                  placeholder="نام کتاب"
                />
              </div>
              <div className="mb-2">
                {" "}
                <span className="text-sm">نویسنده کتاب</span>
                <input
                  type="text"
                  id="base-input"
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  autoComplete="off"
                  placeholder="نویسنده کتاب"
                />
              </div>
              <div className="mb-2">
                {" "}
                <span> فایل PDF کتاب </span>
                <div className="mt-2 relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                  <div className="absolute">
                    <div className="flex flex-col items-center ">
                      {" "}
                      <i className="fa fa-cloud-upload fa-3x text-gray-200" />{" "}
                      <span className="block text-gray-400 font-normal">
                        {" "}
                        فایل PDF کتاب را انتخاب کنید
                      </span>{" "}
                      <span className="block text-gray-400 font-normal py-4">
                        یا
                      </span>{" "}
                      <span className="block text-blue-400 font-normal">
                        اینجا ضربه بزنید{" "}
                      </span>{" "}
                    </div>
                  </div>{" "}
                  <input type="file" className="h-full w-full opacity-0" name />
                </div>
              </div>
              <div className="mb-2">
                {" "}
                <span className="text-sm">توضیحات</span>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-2 text-sm block p-2.5 w-full  text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" توضیحاتی راجب کتاب برامون بنویس. الزامی نیس ولی بنویسی خوبه!..."
                ></textarea>
              </div>
              <div className="mt-10 text-left pb-3" dir="ltr">
                <button
                  type="button"
                  className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                    ></path>
                  </svg>
                  انتشار
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
