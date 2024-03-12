import { useState, useEffect } from 'react'
import Toast from '../Toast/Toast'
import { useRouter } from 'next/router'
import { AxiosInstance } from '../../utils/http/index'


export default function Verify() {
  const [showToast, setShowToast] = useState(false)
  const [code, setCode] = useState('')
  const [wrongCode, setWrongCode] = useState(false)
  const router = useRouter()
  const { query: { usernameData } } = router

  useEffect(() => {
    const { query: { usernameData } } = router
  }, [router.query])


  const handleVerify = async (e) => {
    setShowToast(false)
    setWrongCode(false)
    e.preventDefault()
    await AxiosInstance.post('/verify',
      JSON.stringify({ username: usernameData, code }),
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => {
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        setShowToast(true)
        setTimeout(() => {
          router.push('/user/dashboard')
        }, 2000)

      } else if (response.data.success == false) {
        setError(true)
      }
    }).catch((error) => {
      setWrongCode(true)
    })
  }


return (
  <>
  {wrongCode && <Toast type='error' message='کد تایید نادرست است' />}
  {showToast && <Toast type='success' message='کد تایید شد . خوش آمدید' />}
  <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="border border-gray-200 p-10 rounded-lg max-w-md w-full space-y-8">
      <div>
        <h4 className="mt-8 text-center text-xl font-extrabold text-gray-700">تایید شماره موبایل</h4>
        <p className="text-center text-sm text-gray-600 mt-5">
          <a href="#" className="font-medium text-blue-600 hover:text-green-500">کد ارسال شد </a>
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <form onSubmit={handleVerify}>
        
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">کد ارسال شده</label>
              <input name="code" maxLength={5} value={code} onChange={(e) => setCode(e.target.value)} type="text" autoComplete="off" required className="text-center h-12 appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="کد ارسال شده را وارد کنید" />
            </div>
          </div>
          <div className='mt-2 mb-2'>
            <p className="text-gray-500 text-[11px] text-center leading-loose">دقت داشته باشید در اولین ورود نام کاربری شما کدملی و رمز عبور شما شماره دانشجویی شما می باشد</p>
          </div>
          <div>
            <button type="submit" className={code.length == 5 ? "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              : "group disabled relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg fill="#FFFFFF" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M3 3C3.55229 3 4 3.44771 4 4L4 16C4 16.5523 3.55228 17 3 17C2.44771 17 2 16.5523 2 16L2 4C2 3.44771 2.44772 3 3 3ZM10.7071 6.29289C11.0976 6.68342 11.0976 7.31658 10.7071 7.70711L9.41421 9L17 9C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11L9.41421 11L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L6.29289 10.7071C6.10536 10.5196 6 10.2652 6 10C6 9.73478 6.10536 9.48043 6.29289 9.29289L9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289Z" fill="#374151" fillRule="evenodd" /></svg>
              </span>
              تایید
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </>
)
}