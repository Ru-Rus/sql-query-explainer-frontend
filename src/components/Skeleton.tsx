export default function Skeleton() {
  return (
    <div className="mt-8 space-y-6 animate-pulse">

      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="h-5 w-32 bg-gray-700 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
        </div>
      </div>

      <div className="bg-yellow-950 border border-yellow-800 p-6 rounded-xl">
        <div className="h-5 w-40 bg-yellow-900 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-yellow-900 rounded w-full" />
          <div className="h-4 bg-yellow-900 rounded w-3/4" />
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="h-5 w-36 bg-gray-700 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="h-5 w-32 bg-gray-700 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
        </div>
      </div>

    </div>
  );
}