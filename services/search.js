import { AxiosInstance } from "../utils/http";

export async function last_search(
  bookName,
  libraryId,
  pageId,
  categoryId
) {
  const result = await AxiosInstance.post("/home/last-search", {
    bookName,
    libraryId,
    pageId,
    categoryId,
  });
  console.log({result})

  return result.data;
}
