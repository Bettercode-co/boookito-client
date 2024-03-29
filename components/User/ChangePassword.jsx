import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosInstance } from "../../utils/http";
import { toast } from "react-toastify";
import LogoApplication from "../Home/Logo";

const initialValues = {
  password: "",
  newPassword: "",
  verifyNewPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required("رمز عبور فعلی خود را وارد نمایید"),
  newPassword: Yup.string().required("رمز عبور جدید خود را وارد نمایید").min(5),
  verifyNewPassword: Yup.string()
    .required("رمز عبور خود را دوباره وارد نماید")
    .oneOf([Yup.ref("newPassword"), null], "عدم مطابقت رمز "),
});

const ChangePasswordComponent = () => {
  const onSubmit = (values) => {
    AxiosInstance.post(
      "/auth/changepassword",
      { expassword: values.password, newpassword: values.newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        toast.success("رمز عبور شما با موفقیت تغییر یافت", { autoClose: 2000 });
      })
      .catch((e) =>
        toast.error("رمز قبلی درست وارد نشده است", { autoClose: 2000 })
      );
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 mt-5">
        <div className="w-full border  bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-center">
              <LogoApplication />
            </div>

            <span className="font-medium text-gray-500  ">
              برای ست کردن رمز عبور جدید رمز عبور فعلی خود را وارد کنید
            </span>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <input
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  id="pass"
                  autoComplete="off"
                  className="bg-gray-50 text-center   border-gray-300 text-green-600 sm:text-sm rounded-lg focus:ring-green-600 focus:outline-none border focus:border-green-600 block w-full p-2.5 "
                  placeholder="رمز عبور فعلی"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="my-2 text-red-500 text-xs">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  type="password"
                  name="newPassword"
                  autoComplete="off"
                  id="11"
                  className="bg-gray-50 text-center   border-gray-300 text-green-600 sm:text-sm rounded-lg focus:ring-green-600 focus:outline-none border focus:border-green-600 block w-full p-2.5 "
                  placeholder="رمز عبور جدید"
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <div className="my-2 text-red-500 text-xs">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>
              <div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verifyNewPassword}
                  type="password"
                  name="verifyNewPassword"
                  id="verifyNewPassword"
                  autoComplete="off"
                  className="bg-gray-50 text-center   border-gray-300 text-green-600 sm:text-sm rounded-lg focus:ring-green-600 focus:outline-none border focus:border-green-600 block w-full p-2.5 "
                  placeholder="تکرار رمز عبور جدید
                  "
                />
                {formik.errors.verifyNewPassword &&
                  formik.touched.verifyNewPassword && (
                    <div className="my-2 text-red-500 text-xs">
                      {formik.errors.verifyNewPassword}
                    </div>
                  )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="text-white w-full  mt-5  bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  py-3  mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  {" "}
                  تغییر رمز عبور{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordComponent;
