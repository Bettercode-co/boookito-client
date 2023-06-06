import SingleComment from './SingleComment'

export default function ModalComment(props) {
   
   const allComments = props.data.map((value, index) => {
      return <SingleComment image={value.user.avatarSource} comment={value.comment} key={index} fullname={value.user.usernameSocial} time={value.datediff} />
   })

   return (
      <>
         <input type="checkbox" id={props.idmodal} className="modal-toggle" />
         <div className="modal rounded-2xl modal-bottom sm:modal-middle overflow-auto">
            <div className="modal-box px-5 min-h-screen">
               <div className="modal-action sticky top-0" dir='ltr'>
                  <label htmlFor={props.idmodal} className="btn"> <svg fill='#fff' width={15} viewBox="0 0 96 96"
                     xmlns="http://www.w3.org/2000/svg">
                     <title />
                     <path
                        d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
                  </svg>
                  </label>
               </div>
               {allComments.length > 0 ? allComments :
                  <div className="p-4 mx-5 my-[50%] shadow-inner border text-sm text-center text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
                     <span className="font-bold">!نظری برای این پست ثبت نشده است</span>
                  </div>
               }







            </div>

            
         </div>

         
      </>
   )
}