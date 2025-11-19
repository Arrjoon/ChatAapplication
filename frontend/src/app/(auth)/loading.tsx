export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-700 rounded-full animate-spin border-t-white"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-pulse border-t-gray-500"></div>
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-gray-200 font-medium">Loading</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
