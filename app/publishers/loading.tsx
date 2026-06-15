export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Skeleton */}
      <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-8"></div>

      {/* Search Input Skeleton */}
      <div className="mb-6">
        <div className="h-12 w-full max-w-md bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Results Count Skeleton */}
      <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-4"></div>

      {/* Table Skeleton */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-4">
                <div className="h-5 w-24 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-5 w-20 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-5 w-20 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-5 w-16 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-5 w-20 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>

          {/* Table Body - Skeleton Rows */}
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="bg-white dark:bg-zinc-900">
                <td className="px-6 py-4">
                  <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-28 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-8 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}