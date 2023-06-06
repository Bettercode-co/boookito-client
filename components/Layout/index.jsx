import Head from "next/head";
import Toast from "../Toast/Toast";
import NavbarComponent from "./Navbar";

export default function Layout(props) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/logo.svg" />
        <title>بوکیتو-سرویس ابری کتابخانه های دانشگاه ها</title>
        <meta name="description" content="بوکیتو-سرویس ابری کتابخانه"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
      </Head>

      <main className="grid grid-cols-12 mx-auto container  md:gap-x-4 min-h-screen">
        <div className="col-span-12 md:col-span-12  ">
          <Toast />
          {props.children}
        </div>
      </main>
    </>
  );
}
