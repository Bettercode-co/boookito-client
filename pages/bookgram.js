import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AllPosts from '../components/Bookgram/AllPosts'
import { AxiosInstance } from '../utils/http';
export default function bookgram() {

  const router = useRouter()
  useEffect(() => {
    AxiosInstance.get('/user/myprofile',{
      headers : {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(function (res) {
        console.log(res.data)
      }).catch(err => {
        router.push("/login")
      })
  }, [])
  return (
   
   <AllPosts/>

  )
}
