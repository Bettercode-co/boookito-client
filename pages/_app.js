import "../styles/globals.css";
import "../styles/style.css";
import Layout from "../components/Layout";

import NextNProgress from "nextjs-progressbar";
import { useState } from "react";
import Login from "../components/Login";
import NavbarComponent from "../components/Layout/Navbar";
import { useRouter } from "next/router";
import ApiMiddleware from "../components/Middleware/Up";
import DesktopFooter from "../components/Footer/Desktop";

function MyApp({ Component, pageProps }) {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  const nowRouter = router.asPath;

  return (
    <>
      <ApiMiddleware />
      {login ? (
        <Layout>
          <NavbarComponent url={nowRouter} />

          <NextNProgress
            options={{ easing: "ease", speed: 700 }}
            color="#22c55e"
            startPosition={0.3}
            stopDelayMs={50}
            height={4}
            showOnShallow={true}
          />
          <main className="grid grid-cols-12 mx-auto container  md:gap-x-4 min-h-screen">
            <div className="col-span-12 md:col-span-12  ">
              <Component {...pageProps} />
            </div>
          </main>
          <DesktopFooter />
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
