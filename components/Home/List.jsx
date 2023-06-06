import React from "react";

export default function List(props) {
  return (
    <div className="relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6">
      <div className="group relative flex cursor-pointer justify-between rounded-xl bg-gray-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-blue-300 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
        <div className="relative  space-y-1 p-4">
          <h4 className="text-md text-gray-600">{props.title}</h4>
          <div className="relative h-6 text-blue-500 text-sm">
            <a
              href
              className="flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-6 w-12 mb-5 transition duration-300 group-hover:scale-[1.4]"
          src={props.src}
          alt=""
        />
      </div>
    </div>
  );
}
