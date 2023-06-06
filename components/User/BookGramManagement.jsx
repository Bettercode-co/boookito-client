import { useEffect, useState } from 'react'
import { AxiosInstance } from "../../utils/http"
import MyPost from './MySinglePost'


export default function BookGramManagement() {
   const [post, setPost] = useState([])

   useEffect(() => {
      AxiosInstance.get('/user/myposts',{
         headers : {
           "Authorization": `Bearer ${localStorage.getItem('token')}`
         }
       }
      ).then(res => {
         setPost(res.data)
      }).then(err => err)
   }, [])


   const allPosts = post.length > 0 && post.map((element, index) => {
      return  <MyPost comments={element._count.comments} likes={element._count.likes} key={index} id={element.id} profilepic={element.user.avatarSource}  source={element.mediaSource} createdat={element.createdAt} desc={element.title} setPosts={setPost} />
   })

   return (
      <>
         {allPosts ?  <div dir='ltr' className='md:my-10 my-2 md:px-4 grid grid-cols-12 gap-y-6 ' >{allPosts }</div>   
           :
           <div className="p-4 mx-5 my-[50%] md:my-[20%] shadow-inner border text-sm text-center text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
               <span className="font-bold">شما پستی ندارید!</span>
            </div>
         }
      </>
   )
}
