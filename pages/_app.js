import "../styles/globals.css";
import "../styles/style.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import { Head } from "next/document";
import NavbarComponent from "../components/Layout/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  const nowRouter=router.asPath
  console.log(nowRouter)
  return (
    <>
      {login ? (
        <Layout>
          <NavbarComponent url={nowRouter} />

          <Header />
          <NextNProgress
            options={{ easing: "ease", speed: 500 }}
            color="#22c55e"
            startPosition={0.3}
            stopDelayMs={50}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
