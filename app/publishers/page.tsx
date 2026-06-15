import { getAllPublishersWithDelay } from '@/lib/data';
import PublishersClient from '@/components/PublishersClient';
import { Suspense } from 'react';

export default async function PublishersPage() {
  const publishers = await getAllPublishersWithDelay();

 return (
    <Suspense
      fallback={<div className="text-center py-12">Loading publishers...</div>}
    >
      <PublishersClient publishers={publishers} />
    </Suspense>
  );
}
