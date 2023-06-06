import React, { useState } from "react";
export default function Index() {
  const [ebook, setEbook] = useState([]);

  return (
    <>
      <p className="mt-8 mb-4 text-sm font-bold text-gray-700 mx-6 text-center">
        {" "}
        ایبوک{" "}
      </p>

      <p className="mt-8 mb-4 text-sm font-bold text-gray-700 mx-6 text-center">
        Comming Soon
      </p>
    </>
  );
}
