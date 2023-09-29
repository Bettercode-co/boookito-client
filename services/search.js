import { AxiosInstance } from "../utils/http";




export async function suggestionService (data){

  const query=JSON.stringify(data)
const result = await AxiosInstance.post("/home/suggestion ", {
  query:query
  });
  
  return result.data
}



export async function last_search(bookName, libraryId, pageId, subCategoryId,categoryId) {

  const result = await AxiosInstance.post("/home/last-search", {
    bookName,
    libraryId,
    pageId,
    subCategoryId,
    categoryId
  });



  return result.data.hits  ;
}
