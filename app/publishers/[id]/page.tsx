import { getPublisherById, getBooksByPublisherId } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PublisherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publisher = getPublisherById(parseInt(id));

  if (!publisher) {
    notFound();
  }

  const books = getBooksByPublisherId(publisher.id);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/publishers"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8 transition-colors"
        >
          <span>←</span>
          <span>Back to Publishers</span>
        </Link>

        {/* Publisher Header Card */}
        <div className="bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-lg shadow-lg p-8 mb-12 border border-zinc-200 dark:border-zinc-700">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {publisher.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                  FOUNDED
                </span>
                <p className="text-zinc-900 dark:text-zinc-50 font-semibold">
                  {publisher.foundedYear}
                </p>
              </div>
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                  COUNTRY
                </span>
                <p className="text-zinc-900 dark:text-zinc-50 font-semibold">
                  {publisher.country}
                </p>
              </div>
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                  PUBLISHED BOOKS
                </span>
                <p className="text-zinc-900 dark:text-zinc-50 font-semibold">
                  {books.length}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {(publisher.email || publisher.phone) && (
            <div className="border-t border-zinc-300 dark:border-zinc-700 pt-6 mt-6">
              <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3 uppercase">
                Contact
              </h3>
              <div className="space-y-2">
                {publisher.email && (
                  <p className="text-zinc-700 dark:text-zinc-300">
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href={`mailto:${publisher.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {publisher.email}
                    </a>
                  </p>
                )}
                {publisher.phone && (
                  <p className="text-zinc-700 dark:text-zinc-300">
                    <span className="font-medium">Phone:</span>{" "}
                    <a
                      href={`tel:${publisher.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {publisher.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Books Section */}
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Published Books{" "}
            <span className="text-zinc-500">({books.length})</span>
          </h2>

          {books.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <p className="text-zinc-600 dark:text-zinc-400">
                No books published by this publisher yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {books.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <p>
                      <span className="font-medium">Genre:</span> {book.genre}
                    </p>
                    <p>
                      <span className="font-medium">Year:</span>{" "}
                      {book.publishedYear}
                    </p>
                    <p>
                      <span className="font-medium">Pages:</span> {book.pages}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
                      ISBN: {book.isbn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
