import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/hooks/use-notification';
import { products } from '@/lib/products';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose }) => {
  const [hasShown, setHasShown] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showProductAdded } = useNotification();

  // Produto real para o anúncio (usando o primeiro produto que funciona)
  const adProduct = products.find(p => p.id === "1") || products[0]; // Paracetamol ou primeiro produto

  useEffect(() => {
    // Verificar se já foi mostrado
    const hasShownAd = localStorage.getItem('adShown');
    
    if (!hasShownAd && !hasShown) {
      // Mostrar o modal após 2 segundos
      const timer = setTimeout(() => {
        setHasShown(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  const handleClose = () => {
    localStorage.setItem('adShown', 'true');
    onClose();
  };

  const handleAddToCart = () => {
    // Adicionar produto ao carrinho com a quantidade selecionada
    for (let i = 0; i < quantity; i++) {
      addToCart(adProduct);
    }
    showProductAdded(`${adProduct.name} (${quantity}x)`);
    handleClose();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!isOpen || !hasShown) return null;

  return (
    <>
      {/* Overlay escuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-[9998]"
        onClick={handleClose}
      />
      
      {/* Modal centralizado */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Botão de fechar no topo */}
          <Button
            variant="outline"
            onClick={handleClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full border-gray-300 hover:border-[#e41e3c] hover:text-[#e41e3c] flex items-center justify-center bg-white/90 backdrop-blur-sm z-10"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Imagem do produto */}
          <div className="relative h-48 bg-gradient-to-br from-[#e41e3c] to-[#c41e3c] overflow-hidden">
            <img 
              src={adProduct.imageUrl} 
              alt={adProduct.name} 
              className="w-full h-full object-cover"
            />
            
            {/* Badges promocionais */}
            {adProduct.discount && (
              <Badge className="absolute top-3 left-3 bg-yellow-400 text-gray-900 font-newjune-extrabold text-xs px-2 py-1 rounded-md">
                -{adProduct.discount}%
              </Badge>
            )}
            
            <Badge className="absolute top-3 right-3 bg-yellow-400 text-gray-900 font-newjune-extrabold text-xs px-2 py-1 rounded-md">
              OFERTA
            </Badge>
            
            <Badge className="absolute bottom-3 left-3 bg-blue-500 text-white font-newjune-extrabold text-xs px-2 py-1 rounded-md">
              POPULAR
            </Badge>
            
            <Badge className="absolute bottom-3 right-3 bg-blue-500 text-white font-newjune-extrabold text-xs px-2 py-1 rounded-md">
              QUALIDADE
            </Badge>
          </div>

          {/* Conteúdo do modal */}
          <div className="p-6">
            {/* Título do produto */}
            <h3 className="text-xl font-bold text-gray-900 font-newjune-extrabold mb-2 leading-tight">
              {adProduct.name}
            </h3>
            
            {adProduct.subtitle && (
              <p className="text-sm text-gray-600 font-newjune-regular mb-3">
                {adProduct.subtitle}
              </p>
            )}
            
            {/* Preços */}
            <div className="flex items-center gap-3 mb-4">
              {adProduct.originalPrice && (
                <span className="text-sm text-gray-500 line-through font-newjune-regular">
                  De R$ {adProduct.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-2xl font-bold text-[#e41e3c] font-newjune-extrabold">
                por R$ {adProduct.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Seletor de quantidade */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 rounded-full border-gray-300 hover:border-[#e41e3c]"
                disabled={quantity <= 1}
              >
                -
              </Button>
              
              <div className="w-16 h-10 border border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold font-newjune-extrabold">{quantity}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 rounded-full border-gray-300 hover:border-[#e41e3c]"
                disabled={quantity >= 10}
              >
                +
              </Button>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#e41e3c] hover:bg-[#c41e3c] font-newjune-extrabold flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
