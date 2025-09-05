import { Search, ShoppingCart, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import { CartSidebar } from "./CartSidebar";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import CategoriesMenu from "./CategoriesMenu";

interface HeaderProps {
  onOpenOrderModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenOrderModal }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleFinalizeOrder = () => {
    setIsCartOpen(false);
    onOpenOrderModal();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogo?busca=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleCategoriesClick = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };

  // Controlar visibilidade do header baseado no scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Esconde o header quando scroll para baixo (após 50px)
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Mostra o header quando scroll para cima
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200 transition-transform duration-200 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Main Header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1766c01d-4ec2-4f04-bdea-815e308ef13e.png" 
              alt="Drogaria Popular" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar medicamentos, produtos de saúde e beleza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-12 py-2 w-full rounded-full border-2 border-primary/20 focus:border-primary"
              />
              <Button 
                type="submit"
                size="sm" 
                className="absolute right-1 top-1 bottom-1 rounded-full px-3 bg-primary hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Minha Conta</span>
            </Button>
            
            <Button variant="ghost" className="flex items-center gap-2 text-sm relative" onClick={handleCartClick}>
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:inline">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-sm font-medium"
              onClick={handleCategoriesClick}
            >
              <Menu className="h-4 w-4" />
              Todas as categorias
            </Button>
            <Link to="/catalogo" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Catálogo
            </Link>
            <Link to="/catalogo?categoria=medicamentos" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Medicamentos
            </Link>
            <Link to="/catalogo?categoria=beleza" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Beleza
            </Link>
            <Link to="/catalogo?categoria=higiene" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Higiene
            </Link>
            <Link to="/catalogo?categoria=mae-bebe" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Mamãe e Bebê
            </Link>
            <Link to="/catalogo?categoria=suplementos" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Suplementos
            </Link>
            <Link to="/catalogo?categoria=ofertas" className="text-sm font-medium hover:text-[#e41e3c] font-newjune-regular">
              Ofertas
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Menu */}
      <CategoriesMenu 
        isOpen={isCategoriesMenuOpen}
        onClose={() => setIsCategoriesMenuOpen(false)}
      />

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onFinalizeOrder={handleFinalizeOrder}
      />
    </header>
  );
};

export default Header;