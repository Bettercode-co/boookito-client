import React, { useEffect } from 'react'
import {ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Toast({type='success',message=''}) {
  useEffect(()=> {
    if (message) {
      toast[type](message)
    }
  },[type,message])
  return (
    <ToastContainer
    position="top-center"
    autoClose={700}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={true}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='colored'
    />
  )
}
