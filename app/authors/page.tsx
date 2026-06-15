import { getAllAuthorsWithDelay } from '@/lib/data';
import AuthorsClient from '@/components/AuthorsClient';
import { Suspense } from 'react';

export default async function AuthorsPage() {
  const authors = await getAllAuthorsWithDelay();

 return (
    <Suspense
      fallback={<div className="text-center py-12">Loading authors...</div>}
    >
      <AuthorsClient authors={authors} />
    </Suspense>
  );
}
