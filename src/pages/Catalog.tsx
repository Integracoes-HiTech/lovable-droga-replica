import React from 'react';
import Catalog from '@/components/Catalog';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

export default function CatalogPage() {
  // Scroll para o topo sempre que navegar para uma nova página
  useScrollToTop();

  return (
    <div className="bg-gray-50">
      <Catalog />
    </div>
  );
}
