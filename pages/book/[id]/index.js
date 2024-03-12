import { useRouter } from "next/router";
import React from "react";
import PageBook from "../../../components/Home/PageBook";

const provider = () => {
  const router = useRouter();

  const { id } = router.query;
  return <PageBook id={id} />;
};

export default provider;
