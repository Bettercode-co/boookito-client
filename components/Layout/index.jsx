import Head from "next/head";
import Toast from "../Toast/Toast";

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
        <title>بوکیتو-سرویس ابری کتابخانه های دانشگاه ها</title>
        <meta name="description" content="بوکیتو سرویس ابری مدیریت کتابخانه‌های دانشگاه ها که امکان قرض‌گیری کتاب، جستجوی منابع اطلاعاتی و ارائه خدمات دیگر مرتبط با کتابخانه را به اعضای دیگر دانشگاه ها فراهم می‌کند"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
      </Head>

        <div className="col-span-12 md:col-span-12  ">
          <Toast />
          {props.children}
        </div>
    </>
  );
}
