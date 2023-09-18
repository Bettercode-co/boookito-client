export default function LazyBookComponent(){
  const data=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  console.log(data.length,"LEN")
  const x=data.map((value,index)=>{
    return  <div className="relative m-3 flex flex-col items-center justify-center">
    <div className="container">
      <div className="max-w-md w-full bg-gray-100 shadow-lg rounded-xl p-6">
        <div className="flex flex-col">
          <div className="">
            <div className="relative h-62 w-full mb-3">
              <div className="absolute flex flex-col top-0 right-0 p-3">
                <div className="transition ease-in duration-300 bg-gray-800 hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1 animate-pulse" />
              </div>
              <div className="animate-pulse">
                <div className="lg:h-56 h-96 w-full bg-gray-300 rounded-2xl" />
              </div>
            </div>
            <div className="flex-auto justify-evenly">
              <div className="flex flex-wrap">
                <div className="w-full flex-none text-sm flex items-center text-gray-600">
                  <div className="h-4 bg-gray-300 w-16 rounded-md animate-pulse" />
                </div>
                <div className="flex items-center w-full justify-between min-w-0 my-1">
                  <div className="text-lg text-right cursor-pointer text-gray-700 font-bold hover:text-purple-500 truncate animate-pulse">
                    <div className="h-4 bg-gray-300 rounded-md w-4/5 mb-1 animate-pulse" />
                    <div className="h-4 bg-gray-300 rounded-md w-3/4 animate-pulse" />
                  </div>
                  <div className="flex items-center font-semibold bg-green-600 text-gray-100 text-xs px-2 py-1 ml-3 rounded-lg animate-pulse">
                    <div className="h-4 bg-gray-300 rounded-md w-16 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-700 font-semibold h-12 mt-1 animate-pulse" />
              <div className="flex space-x-2 text-sm font-medium justify-start mt-5">
                <div className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-emerald-600 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded-md w-24 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  })
    return x
}