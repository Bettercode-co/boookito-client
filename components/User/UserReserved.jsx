import { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/http";
import SingleReserved from "./SingleReserved";
import moment from "jalali-moment";
import Pn from "persian-number";

export default function UserReserved() {
  const [order, setOrder] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    AxiosInstance.get("/user/myorders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (res) {
        setOrder(res.data.result);
        setCount(res.data.count);
      })
      .catch(() => {
        setOrder([]);
      });
  }, []);

  const orders = order.map((element, index) => {
    return (
      <SingleReserved
        trakingcode={element.trakingCode}
        returned={element.orderStatus}
        expire={moment(element.expireAt, "YYYY-MM-DD")
          .locale("fa")
          .format("YYYY-MM-DD")}
        bookname={element.book.bookName}
        image={element.book.imageSource}
        index={index}
        createdAt={moment(element.createdAt, "YYYY-MM-DD")
          .locale("fa")
          .format("YYYY-MM-DD")}
          bookId={element.bookid}
      />
    );
  });

  return (
    <>
      <div className="px-4 max-w-2xl mx-auto bg-white rounded-lg border shadow-md sm:p-8  md:mt-10">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-lg font-bold leading-none text-gray-900  mt-6 ">
            امانات من{" "}
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline "
          >
            <span className="mt-6 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs  leading-none text-white bg-green-600 rounded-full">
              {Pn.convertEnToPe(count)} امانت فعال
            </span>
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200  ">
            {orders.length > 0 ? (
              orders
            ) : (
              <div
                className="p-4  mx-5 mb-5 shadow-inner border text-sm text-center text-gray-700 bg-gray-100 rounded-lg"
                role="alert"
              >
                <span className="font-bold">هنوز کتابی رو امانت نکردین!</span>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
