import Link from "next/link";
import BlurImage from "../Lazy/BlurImage";

export default function SingleRowBook(props) {
  return (
    <div className="card p-5 card-side justify-center dark:bg-gray-700 dark:border-gray-800 bg-white border shadow-sm rounded-xl hover:shadow-md transition mx-4 my-3 md:px-4 px-2">
      <Link href={{ pathname: "/book/[id]" }} as={`/book/${props.bookId}`}>
        <a className="group rounded-xl overflow-hidden">
          <div className="relative h-72 scale-100 pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <Link
              href={{ pathname: "/book/[id]" }}
              as={`/book/${props.bookId}`}
            >
              <BlurImage image={props.imageSource} />
            </Link>
            <span className="absolute  top-0 right-0 rounded-tr-xl rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
              #{props.categoryName}
            </span>
          </div>
          <div className="mt-7">
            <h3 className="text-sm font-bold dark:text-white text-gray-700 group-hover:text-gray-600 dark:group-hover:text-white">
              {props.bookName}
            </h3>
            <p className="mt-3 w-96 font-bold text-xs text-gray-600 dark:text-gray-200">
              {props.publisherName}
            </p>
            <p className="mt-5  w-full inline-flex items-center gap-x-1.5 text-green-600 decoration-2 group-hover:underline font-medium">
              مشاهده کتاب
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}
