import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/hooks/use-notification';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalizeOrder: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onFinalizeOrder }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { showProductAdded } = useNotification();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
                          {/* Sidebar */}
                    <div className={`fixed top-0 right-0 h-screen w-full sm:w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                          <h2 className="text-lg font-semibold flex items-center gap-2 font-newjune-extrabold">
                            <ShoppingCart className="h-5 w-5" />
                            Meu Carrinho
                          </h2>
                          <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
              
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-newjune-regular">Seu carrinho está vazio</p>
                <p className="text-sm text-gray-400 mt-2 font-newjune-regular">Adicione produtos para continuar</p>
              </div>
            ) : (
                             <div className="space-y-3">
                {items.map((item) => (
                                     <Card key={item.product.id} className="border border-gray-200 shadow-sm">
                     <CardContent className="p-3">
                       <div className="flex gap-2">
                                                 {/* Product Image */}
                         <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                           <img
                             src={item.product.imageUrl}
                             alt={item.product.name}
                             className="w-full h-full object-cover"
                             loading="lazy"
                           />
                         </div>
                        
                                                 {/* Product Info */}
                         <div className="flex-1 min-w-0">
                           <h3 className="font-medium text-sm truncate font-newjune-extrabold">{item.product.name}</h3>
                           {item.product.subtitle && (
                             <p className="text-xs text-gray-500 mt-1 font-newjune-regular truncate">{item.product.subtitle}</p>
                           )}
                           <p className="text-sm text-[#e41e3c] font-bold mt-1 font-newjune-extrabold">
                             {item.product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                           </p>
                           
                           {/* Quantity Controls */}
                           <div className="flex items-center gap-1 mt-3">
                             <Button
                               variant="outline"
                               size="sm"
                               className="h-7 w-7 p-0 border-gray-300 hover:border-[#e41e3c]"
                               onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                             >
                               <Minus className="h-3 w-3" />
                             </Button>
                             
                             <span className="text-sm font-medium min-w-[1.5rem] text-center font-newjune-extrabold">
                               {item.quantity}
                             </span>
                             
                             <Button
                               variant="outline"
                               size="sm"
                               className="h-7 w-7 p-0 border-gray-300 hover:border-[#e41e3c]"
                               onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                             >
                               <Plus className="h-3 w-3" />
                             </Button>
                             
                             <Button
                               variant="ghost"
                               size="sm"
                               className="h-7 w-7 p-0 text-gray-500 hover:text-red-500"
                               onClick={() => handleRemoveItem(item.product.id)}
                             >
                               <Trash2 className="h-3 w-3" />
                             </Button>
                           </div>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

                                  {/* Footer */}
                        {items.length > 0 && (
                          <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-lg font-semibold font-newjune-extrabold">Total:</span>
                              <span className="text-xl font-bold text-[#e41e3c] font-newjune-extrabold">
                                {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </span>
                            </div>
                            
                            <Button 
                              className="w-full bg-[#e41e3c] hover:bg-[#c41e3c] font-newjune-extrabold py-3"
                              onClick={onFinalizeOrder}
                            >
                              Finalizar Pedido
                            </Button>
                            
                            <p className="text-xs text-gray-500 text-center mt-2 font-newjune-regular">
                              Frete grátis acima de R$ 200
                            </p>
                          </div>
                        )}
        </div>
      </div>
    </>
  );
};
