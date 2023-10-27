export default function LazyBookComponent() {
  return (
    <div className="flex justify-center items-center sm:mt-[15%] ">
    <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-green-500 via-blue-500  ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
    </div>
</div>
  );
}
