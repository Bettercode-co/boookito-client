import { useState } from "react";
import ChangePassword from "./ChangePassword";
import { useRouter } from "next/router";

import { AxiosInstance } from "../../utils/http/index";
import Link from "next/link";
import { toast } from "react-toastify";
import LogoApplication from "../Home/Logo";
import Pn from "persian-number";
import Head from "next/head";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPaswword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    await AxiosInstance.post(
      "/auth/login",
      JSON.stringify({ username, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.data.accessToken) {
          toast.success(res.data?.message);
          setLogin(true);
          localStorage.setItem("token", res.data.accessToken);
          AxiosInstance.get("/user/myprofile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then((res) => {

          });
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          toast.error(res.data?.message);
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      <Head>
        <title>بوکیتو-ورود به حساب کاربری</title>
      </Head>
      {changePassword ? (
        <ChangePassword username={username} />
      ) : (
        <div className=" flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-200 bg-white  p-10 rounded-lg max-w-md w-full space-y-8">
            <div className="text-center">
              <LogoApplication />

              <p className="text-center text-sm text-gray-600 mt-5">
                <span className="font-medium text-gray-500">
                  برای ورود به بوکیتو نام کاربری و رمز عبور خود را وارد کنید
                </span>
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      شماره تماس
                    </label>
                    <input
                      dir="ltr"
                      type="text"
                      minLength="10"
                      maxLength="10"
                      name="username"
                      onChange={(e) =>
                        setUsername(Pn.convertPeToEn(e.target.value.trim()))
                      }
                      autoComplete="off"
                      required
                      value={Pn.convertEnToPe(username)}
                      className=" text-center h-12 bg-transparent appearance-textfield rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="نام کاربری "
                    />
                    <input
                      dir="ltr"
                      type="password"
                      minLength="6"
                      value={Pn.convertEnToPe(password)}
                      name="password"
                      onChange={(e) =>
                        setPaswword(Pn.convertPeToEn(e.target.value.trim()))
                      }
                      autoComplete="off"
                      required
                      className="mt-5 text-center h-12 bg-transparent appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="رمز عبور "
                    />
                  </div>
                </div>
                <div className="mt-2 mb-2"></div>
                <div>
                  <button
                    type="submit"
                    className="mt-8 mb-3    group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        fill="#FFFFFF"
                        height={20}
                        viewBox="0 0 20 20"
                        width={20}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M3 3C3.55229 3 4 3.44771 4 4L4 16C4 16.5523 3.55228 17 3 17C2.44771 17 2 16.5523 2 16L2 4C2 3.44771 2.44772 3 3 3ZM10.7071 6.29289C11.0976 6.68342 11.0976 7.31658 10.7071 7.70711L9.41421 9L17 9C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11L9.41421 11L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L6.29289 10.7071C6.10536 10.5196 6 10.2652 6 10C6 9.73478 6.10536 9.48043 6.29289 9.29289L9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289Z"
                          fill="#fffff"
                          fillRule="evenodd"
                        />
                      </svg>
                    </span>
                    ورود
                  </button>

                  <Link href="/user/forgetpassword">
                    <a className="text-xs  text-green-600 ">
                      رمز عبور خود را فراموش کرده ام
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
