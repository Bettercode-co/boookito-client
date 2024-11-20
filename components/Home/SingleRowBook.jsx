import Link from "next/link";
import React, { useState, useEffect } from "react";

const noPhotoImage = "https://big-storage-arvan.s3.ir-tbz-sh1.arvanstorage.ir/downloads%2Fno-photo-available.png";

export default function SingleRowBook(props) {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const initialImageSrc = !props.imageSource || 
    props.imageSource === "https://bookito-object-storage.storage.iran.liara.space/nophoto.png" 
    ? noPhotoImage 
    : props.imageSource;

  // پیش‌لود تصویر قبل از رندر
  useEffect(() => {
    const img = new Image();
    img.src = initialImageSrc;
    
    const loadImage = () => {
      setImageSrc(initialImageSrc);
    };

    if (img.complete) {
      loadImage();
    } else {
      img.addEventListener('load', loadImage);
    }

    return () => {
      img.removeEventListener('load', loadImage);
    };
  }, [initialImageSrc]);

  const handleImageError = (e) => {
    if (!hasError) {
      setHasError(true);
      e.target.src = noPhotoImage;
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-3 justify-center my-3">
        <div className="lg:w-4/5 w-5/6 mx-auto">
          <div className="relative h-40 w-full mb-3">
            <div className="absolute flex flex-col top-0 right-0 p-3"></div>
            <Link
              href={{ pathname: "/book/[id]" }}
              as={`/book/${props.bookId}`}
            >
              <img
                src={imageSrc || initialImageSrc}
                alt={props.bookName || "Book cover"}
                className="rounded-md h-40 w-full object-contain"
                onError={handleImageError}
                loading="eager"
                decoding="async"
                fetchPriority="high"
               
                
              />
            </Link>
          </div>
          <div className="flex-auto justify-evenly">
            <div className="flex flex-wrap">
              <div className="flex items-center w-full justify-between min-w-0 my-1">
                <Link
                  href={{ pathname: "/book/[id]" }}
                  as={`/book/${props.bookId}`}
                >
                  <a className="text-sm text-right cursor-pointer text-gray-700 font-bold hover:text-green-700 truncate">
                    {props.bookName}
                  </a>
                </Link>
              </div>
            </div>
            <div className="text-sm text-gray-600 truncate h-12 mt-1">
              {props.publisherName}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}