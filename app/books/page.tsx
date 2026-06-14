import { getAllBooks, getAllAuthors } from "@/lib/data";
import BooksClient from "@/components/BooksClient";
import { Suspense } from "react";

export default function BooksPage() {
  const books = getAllBooks();
  const authors = getAllAuthors();

  return (
    <Suspense
      fallback={<div className="text-center py-12">Loading books...</div>}
    >
      <BooksClient initialBooks={books} authors={authors} />
    </Suspense>
  );
}
