export default function LazyBookComponent() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent mt-[50%] lg:mt-[15%] ">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-[#16a34a] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-[#16a34a] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-[#16a34a] rounded-full animate-bounce"></div>
    </div>
  );
}
