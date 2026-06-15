import { getAllAuthors, getAllBooksWithDelay } from "@/lib/data";
import BooksClient from "@/components/BooksClient";
import { Suspense } from "react";

export default async function BooksPage() {
  const books = await getAllBooksWithDelay();
  const authors = getAllAuthors();

  return (
    <Suspense
      fallback={<div className="text-center py-12">Loading books...</div>}
    >
      <BooksClient initialBooks={books} authors={authors} />
    </Suspense>
  );
}
