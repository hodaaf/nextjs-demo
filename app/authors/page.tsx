import { getAllAuthors } from '@/lib/data';
import AuthorsClient from '@/components/AuthorsClient';
import { Suspense } from 'react';

export default function AuthorsPage() {
  const authors = getAllAuthors();

 return (
    <Suspense
      fallback={<div className="text-center py-12">Loading authors...</div>}
    >
      <AuthorsClient authors={authors} />
    </Suspense>
  );
}
