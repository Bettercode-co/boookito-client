import { AxiosInstance } from "../utils/http";

export async function book_search_with_sub_category(
  bookName,
  libraryId,
  pageId,
  subCategoryId
) {
  const result = await AxiosInstance.post("/home/search", {
    bookName,
    libraryId,
    pageId,
    subCategoryId,
  });
  return result.data;
}

export async function book_search_wit_category(
  bookName,
  libraryId,
  pageId,
  categoryId
) {
  const result = await AxiosInstance.post(`/home/searchc`, {
    bookName,
    pageId,
    categoryId,
    libraryId,
  });
  return result.data;
}

export async function book_init(bookName, libraryId, pageId, subCategoryId) {
  const result = await AxiosInstance.post("/home/search", {
    bookName,
    libraryId,
    pageId,
    subCategoryId,
  });
  return result.data;
}



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
