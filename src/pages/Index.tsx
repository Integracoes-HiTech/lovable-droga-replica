import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

const Index = () => {
  // Scroll para o topo sempre que navegar para uma nova página
  useScrollToTop();

  return (
    <div className="bg-background font-newjune">
      <HeroSection />
      <CategoriesGrid />
    </div>
  );
};

export default Index;
