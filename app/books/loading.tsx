export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Show 6 skeleton cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-80 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mt-2"></div>
            <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mt-2"></div>
        </div>
        ))}
      </div>
    </div>
  );
}