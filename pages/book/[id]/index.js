import { useRouter } from "next/router";
import React from "react";
import PageBook from "../../../components/Home/PageBook";

const provider = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <PageBook id={id} />
      <div id="pos-article-display-93620"></div>
    </>
  );
};

export default provider;
