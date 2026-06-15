import { getAllPublishers } from '@/lib/data';
import PublishersClient from '@/components/PublishersClient';
import { Suspense } from 'react';

export default function PublishersPage() {
  const publishers = getAllPublishers();

 return (
    <Suspense
      fallback={<div className="text-center py-12">Loading publishers...</div>}
    >
      <PublishersClient publishers={publishers} />
    </Suspense>
  );
}
