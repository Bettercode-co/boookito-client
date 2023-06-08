import SinglePost from "../Bookgram/SinglePost";
import React, { useEffect, useState } from "react";
import LoadingScroll from "../Home/LoadingScroll";
import { AxiosInstance } from "../../utils/http/index";
import Link from "next/dist/client/link";
import ScrollToTop from "react-scroll-to-top";

export default function AllPosts() {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [maxcount, setMaxCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data,setData]=useState(false)

  useEffect(() => {
    AxiosInstance.get(`/user/posts/${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(function (res) {
      setPost([...post, ...res.data.result]);
      setLoading(false);
      setMaxCount(res.data.count);
    });
  }, [page]);

  const scrollToEnd = () => {
    setPage(page + 1);
  };

  const allposts = post.map((element, index) => {
    return (
      <SinglePost
        status={setStatus}
        islike={element.userLiked}
        id={element.id}
        key={index}
        likes={element.likes}
        username={element.user.usernameSocial}
        createdat={
          element.date == 0 ? "some hours ago... " : element.date + " day ago"
        }
        source={element.media}
        desc={element.title}
        profilepic={element.user.avatarSource}
        setPost={setPost}
        comments={element.comments}
      />
    );
  });

  return (
    <>

      <div className="mt-10">
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

        {allposts.length > 0 ? (
          <div
            className="grid grid-cols-12 lg:w-2/3 mx-auto gap-y-6 md:my-4 "
            dir="ltr"
          >
            {allposts}
          </div>
        ) : (
          <div
            className="p-4 mx-5 my-[75%] md:my-[20%]  shadow-inner border text-sm text-center text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300"
            role="alert"
          >
            <span className="font-bold block mb-2">
              هنوز پستی ثبت نشده است.
            </span>
            <Link href="/user/newpost">
              <span className="font-bold underline text-red-500">
                اولین نفری باش که پست میزاره!
              </span>
            </Link>
          </div>
        )}
        {post.length < maxcount && <LoadingScroll handleClick={scrollToEnd} />}
      </div>
    </>
  );
}
