import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import book_search, { book_init, book_search_wit_category, book_search_with_sub_category } from "../../services/search";
import { AiOutlineSearch } from "react-icons/ai";
import LogoApplication from "./Logo";
import Select from "../common/Select";
import { AxiosInstance } from "../../utils/http";
import SingleRowBook from "./SingleRowBook";


export default function MainComponent() {

  const router = useRouter(); // new instance for router
  const { bookName, libraryId, pageId, subCategoryId,categoryId } = router.query; //Load Params as Query



 

  //CURRENT STATE

  const [currentBookName, setCurrentBookName] = useState(bookName !=undefined ? bookName : "");

  const [currentLibraryId, setCurrentLibraryId] = useState(libraryId !=undefined ? parseInt(libraryId) : 1);

  const [currentCategoryId, setCurrentCategoryId] = useState(categoryId !=undefined ? parseInt(categoryId) : null);

  const [currentSubCategoryId,setCurrentSubCategoryId]=useState(subCategoryId !=undefined ? parseInt(subCategoryId) : 1)

  const [currenPageId,setCurrentPageId]=useState(1)

  const [currenLoading,setCurrentLoading]=useState(true)
  

   const [books,setBooks]=useState([])

  

  //LOCAL STATE

  const [libraries, SetLibraries] = useState([]);

  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);








  //For GetAll Libraries
  useEffect(() => {
    AxiosInstance.get("/home/libraries").then((res) => {
      SetLibraries(res.data);
    });
  }, []);



  //For GetAll Categories For LibraryId
  useEffect(async() => {
   await  AxiosInstance.get(`/home/categories/${currentLibraryId}`)
      .then((res) => {
        setCategories(res.data);
        

      })
      .catch((e) => console.log(e));
      

  }, [currentLibraryId]);




  //For GetAll Subcategories For CategoryId
  useEffect(() => {
    currentCategoryId&&
      AxiosInstance.get(
        `/home/subcategories?categoryId=${currentCategoryId}`
      ).then((res) => {
        setSubCategories(res.data);
      });
      


  }, [currentCategoryId,currentLibraryId,categoryId,subCategoryId]);




useEffect(async()=>{
    const result=await book_init(currentBookName,currentLibraryId,currenPageId,currentSubCategoryId)
    setBooks(result.result)
    setCurrentLoading(false)
    console.log(books,"BOOOOOKS ")
},[])




  


  //LOGIC SEARCH AND CHANGE ROUTER
  const bookSearch = () => {

    const params = new URLSearchParams();
     params.append('bookName', currentBookName);
    currentLibraryId && params.append('libraryId', currentLibraryId);
    currenPageId && params.append('pageId',currenPageId)
    currentSubCategoryId &&   params.append('subCategoryId',currentSubCategoryId)
    currentCategoryId && params.append('categoryId',currentCategoryId)

    const queryString = params.toString();

    router.push(`?${queryString}`);

  };



  //END QUERY STRING RENDER

  useEffect(async() => {
    const { bookName, libraryId, pageId, subCategoryId } = router.query;
    setBooks([])

    if(currentSubCategoryId){ 
    const result =await  book_search_with_sub_category(bookName, parseInt(libraryId), parseInt(pageId), parseInt(subCategoryId));
    setBooks(result.result)

    console.log('1')
    
}

if (currentCategoryId && !currentSubCategoryId && !currentBookName){ //SEARCH C
    const result =await  book_search_wit_category(bookName, parseInt(libraryId), parseInt(pageId), parseInt(currentCategoryId));
    setBooks(result.result)
    console.log('2')

}

if(currentLibraryId &&  !currentCategoryId){
    const result =await  book_search_with_sub_category(bookName, parseInt(libraryId), parseInt(pageId), parseInt(currentCategoryId));
   console.log("MAN HAMOOZ DARAM")

   console.log(currentCategoryId)
    setBooks(result.result)
}






if(currentCategoryId && currentBookName?.length>1) {
    const result =await  book_search_with_sub_category(bookName, parseInt(libraryId), parseInt(pageId), parseInt(currentSubCategoryId));
    setBooks(result.result)
    console.log('3')

}

  }, [router.query]);





  return (
    <>
      <div className="row">
        <div className="lg:hidden">
          <LogoApplication />
        </div>

        <form
          className="md:mb-8 flex flex-col md:flex-row md:items-center mb-4 lg:mt-8 mt-1 px-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Select
            keyName="libraryName"
            items={libraries}
            defaultValue={libraryId}
            onChange={(v) => setCurrentLibraryId(Number(v))}
            ClassName={
              "md:w-1/4  text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
            }
          />
          <Select
          defaultValue={categoryId}
          
            keyName="categoryName"
            items={categories}
            onChange={(v) => setCurrentCategoryId(Number(v))}
            label={"انتخاب همه دسته ها"}
            ClassName={
              "md:w-1/4 lg:mx-4 mx-0 mt-1 text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
            }
          />
          <Select
            keyName="name"
            items={subCategories}
            defaultValue={subCategoryId}
            onChange={(v) => setCurrentSubCategoryId(Number(v))}
            label={"انتخاب همه زیر دسته ها"}
            ClassName={
              "md:w-1/4 ml-4 mt-1 text-gray-900 rounded-lg bg-gray-50 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500"
            }
          />
          <div className="relative mt-1 md:w-3/4 md:ml-4 mb-4 md:mb-0  ">
            <input
              autoComplete="off"
              type="search"
              
              id="default-search"
              className=" py-5 pr-5 pl-10 w-full md:text-base  text-sm rounded-lg text-gray-900 bg-gray-50  border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder={bookName!=undefined && bookName.length>1 ? bookName : 'جست و جو در بین 40 هزار جلد کتاب'}
              onChange={(e) => setCurrentBookName(e.target.value)}
            />
            <button
              onClick={bookSearch}
              type="submit"
              className=" text-white left-2.5 bottom-3 top-3 absolute bg-green-600  font-medium rounded-lg text-sm px-4 py-2 "
            >
              <div>
                <AiOutlineSearch size={20} className="h-auto" />
                <span className="sr-only">Search</span>
              </div>
            </button>
          </div>
        </form>

<section className="grid md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6 ">

{!currenLoading && books.map((element,index)=>{
    return    <SingleRowBook
    key={index}
    imageSource={element.imageSource}
    bookId={element.id}
    categoryName={element.subCategory.category.categoryName}
    bookName={element.bookName}
    publisherName={element.publisherName}
  />
})}

</section>



      </div>
    </>
  );
}
