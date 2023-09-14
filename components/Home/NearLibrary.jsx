export default function NearLibraryComponent({libraryName}){
 return    <>
<a
  className="group block bg-gray-100 hover:bg-gray-200 p-4 rounded-md text-center transition-all duration-300 dark:bg-white/[.05] dark:hover:bg-white/[.075]"
  href="#"
>
  <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
    <p className="mr-2 inline-block text-sm text-gray-800 dark:text-gray-200">
      نزدیک ترین کتابخانه به شما کتابخانه دانشکده {libraryName} می باشد.
    </p>
   
  </div>
</a>

</>

}