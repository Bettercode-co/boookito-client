import { useRouter } from "next/router";
import React from "react";
import PageBook from "../../../components/Home/PageBook";
import Head from "next/head";

const provider = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(e,t,n){e.yektanetAnalyticsObject=n,e[n]=e[n]||function(){e[n].q.push(arguments)},e[n].q=e[n].q||[];var a=t.getElementsByTagName("head")[0],r=new Date,c="https://cdn.yektanet.com/superscript/Tcnj2RcA/native-one.com-5773/yn_pub.js?v="+r.getFullYear().toString()+"0"+r.getMonth()+"0"+r.getDate()+"0"+r.getHours(),s=t.createElement("link");s.rel="preload",s.as="script",s.href=c,a.appendChild(s);var l=t.createElement("script");l.async=!0,l.src=c,a.appendChild(l)}(window,document,"yektanet");
    `,
          }}
        ></script>
      </Head>

      <PageBook id={id} />
      <div id="pos-article-display-93620"></div>
          </>
  );
};

export default provider;
