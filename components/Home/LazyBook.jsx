export default function LazyBookComponent() {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-green-500 animate-spin"></div>
      </div>
    </div>
  );
}
