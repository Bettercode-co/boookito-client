import React, { useState , useEffect } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../utils/http";




const VerifyNumberComponent = () => {
  const [sendOtpSuccess,setOtpSuccess]=useState(false)
  const [accountdata, setAccountData] = useState({});
  const [phoneNumber,setPhoneNumber] = useState('');
  
  


  useEffect(() => {
    AxiosInstance.get('/user/myprofile',{
      headers : {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(function (res) {
        setAccountData(res.data)
      }).catch(err => err)
  }, [accountdata.username_bookgram])
  


  function sendOtp(){
    if(!phoneNumber){
      toast.error('شماره تماس خود را وارد کنید',{autoClose:2000})
    }
    AxiosInstance.post('auth/sendtoken',{username:accountdata.username,phoneNumber:accountdata.phoneNumber?accountdata.phoneNumber :phoneNumber ,sendTokenType:'VERIFYACCOUNT'},{ headers : {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }})
    .then(function(res){
      console.log(res)
      setOtpSuccess(res.data.success)
    })
    .catch(function(err){
      setOtpSuccess(false)
    })
  }
  
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mx-auto w-20 md:hidden" src="/logo.jpg" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              تایید شماره تماس
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  شماره تماس
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  type="number"
                  name="email"
                  id="email"
                  maxLength={11}
                  minLength={11}
                  autoComplete="off"
                  className="bg-gray-50 border text-left border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="09123456789"
                  required
                />
              </div>
           {sendOtpSuccess && (   <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  کدتایید
                </label>
                <input
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="12345"
                  className="bg-gray-50 text-left border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>)}
              <div className="flex items-center justify-center">
              <button onClick={()=>sendOtp()} type="button" className="text-white w-full md:w-4/12 mt-5  bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ارسال کد</button>
              {sendOtpSuccess && <button onClick={()=>sendOtp()} type="button" className="text-white w-full md:w-4/12 mt-5  bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">تایید کد</button>
}
              </div>
          
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyNumberComponent;
