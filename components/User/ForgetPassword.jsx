import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosInstance } from "../../utils/http";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LogoApplication from "../Home/Logo";
import Pn from "persian-number";
import Link from "next/link";
import Head from "next/head";

const initialValues = {
  username: "",
  studentId: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("نام کاربری خود را وارد کنید"),
  studentId: Yup.string().required("شماره دانشجویی خود را وارد کنید"),
});

const ForgetPassword = () => {
  const onSubmit = (values) => {
    console.log(values.username);
    AxiosInstance.post("/auth/forgetpassword", {
      username: Pn.convertPeToEn(values.username),
      studentId: Pn.convertPeToEn(values.studentId),
    })
      .then(
        (res) => {
          toast.success(res.data.message, { autoClose: 2000 });
        },
        setTimeout(() => {
          router.push("/login");
        }, 2000)
      )
      .catch((e) =>
        toast.error("اطلاعات وارد شده صحیح نمی باشد", { autoClose: 2000 })
      );
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  const router = useRouter();
  return (
    <>
      <Head>
        <title>بوکیتو-فراموشی رمز عبور</title>
      </Head>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          ></a>
          <div className="w-full border  bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 text-center md:space-y-6 sm:p-8">
              <LogoApplication />

              <p className="text-center text-sm  text-gray-600 mt-5">
                برای تغییر درخواست رمزعبور شماره دانشجویی و کدملی خود را وارد
                کنید
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <input
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={Pn.convertEnToPe(formik.values.username)}
                    maxLength={10}
                    minLength={10}
                    type="text"
                    autoComplete="off"
                    className=" text-center bg-transparent h-12 appearance-textfield rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="کدملی"
                  />
                  {formik.errors.username && formik.touched.username && (
                    <div className="my-2 text-red-500 text-xs">
                      {formik.errors.username}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    minLength={14}
                    maxLength={14}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={Pn.convertEnToPe(formik.values.studentId)}
                    type="text"
                    name="studentId"
                    autoComplete="off"
                    className=" text-center bg-transparent h-12 appearance-textfield rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="شماره دانشجویی"
                  />
                  {formik.errors.studentId && formik.touched.studentId && (
                    <div className="my-2 text-red-500 text-xs">
                      {formik.errors.studentId}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="text-white w-full  mt-5  bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  py-3  mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                  >
                    تایید
                  </button>
                </div>
                <Link href="/login">
                  <a className="text-xs float-right  mt-10 pb-12 text-green-600">
                    رمزم یادم اومد
                  </a>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
