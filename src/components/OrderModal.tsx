import React, { useState } from 'react';
import { X, ShoppingCart, Phone, CheckCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/hooks/use-notification';
import { saveOrder } from '@/lib/api';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { showSuccess, showError } = useNotification();
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const totalPrice = getTotalPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      showError('Por favor, informe seu telefone para contato.');
      return;
    }

    if (!customerName.trim()) {
      showError('Por favor, informe seu nome.');
      return;
    }

    if (items.length === 0) {
      showError('Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const savedOrder = await saveOrder(customerName.trim(), phone.trim(), items);
      
      setOrderId(savedOrder.id);
      
      showSuccess(`Pedido #${savedOrder.id} enviado com sucesso! Entraremos em contato em breve.`);
      
      // Limpar carrinho e fechar modal após 2 segundos
        setTimeout(() => {
          clearCart();
          setPhone('');
          setCustomerName('');
          setOrderId(null);
          setIsSubmitting(false);
          onClose();
        }, 2000);
      
    } catch (error) {
      showError(`Erro ao enviar o pedido: ${error instanceof Error ? error.message : 'Tente novamente'}`);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[95vh] flex flex-col relative">
          <div className="flex items-center justify-between p-8 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2 font-newjune-extrabold">
              <ShoppingCart className="h-5 w-5" />
              Finalizar Pedido
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto" id="order-form">
            <div className="mb-8">
              <h3 className="font-semibold mb-3 font-newjune-extrabold text-[#e41e3c]">Resumo do Pedido</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium font-newjune-extrabold">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 font-newjune-regular">Qtd: {item.quantity}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-[#e41e3c] font-newjune-extrabold">
                          {(item.product.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        <p className="text-sm text-gray-500 font-newjune-regular">
                          {item.product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} cada
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold font-newjune-extrabold">Total do Pedido:</span>
                    <span className="text-xl font-bold text-[#e41e3c] font-newjune-extrabold">
                      {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  {totalPrice >= 200 && (
                    <p className="text-sm text-green-600 mt-2 font-newjune-regular">
                      ✅ Frete grátis incluído
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 font-newjune-extrabold text-gray-900">
                Seu nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#e41e3c]" />
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-[#e41e3c] focus:ring-[#e41e3c]"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-newjune-regular">
                👤 Precisamos do seu nome para identificar o pedido
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 font-newjune-extrabold text-gray-900">
                Seu telefone para contato
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#e41e3c]" />
                <Input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-[#e41e3c] focus:ring-[#e41e3c]"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-newjune-regular">
                📞 Precisamos do seu telefone para confirmar o pedido e combinar a entrega
              </p>
            </div>


            <Card className="mb-8 bg-gradient-to-r from-[#e41e3c]/5 to-[#e41e3c]/10 border-[#e41e3c]/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 font-newjune-extrabold text-[#e41e3c]">Como funciona:</h4>
                <div className="space-y-2 text-sm text-gray-700 font-newjune-regular">
                  <p>1️⃣ Após enviar o pedido, entraremos em contato</p>
                  <p>2️⃣ Confirmaremos os produtos e valores</p>
                  <p>3️⃣ Combinaremos forma de pagamento e entrega</p>
                  <p>4️⃣ Seu pedido será processado e entregue</p>
                </div>
              </CardContent>
            </Card>
          </form>
          
          <div className="p-8 border-t">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-300 hover:border-[#e41e3c] font-newjune-extrabold"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                form="order-form"
                className="flex-1 bg-[#e41e3c] hover:bg-[#c41e3c] font-newjune-extrabold"
                disabled={!phone.trim() || !customerName.trim() || isSubmitting || items.length === 0}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Salvando...
                  </div>
                ) : (
                  'Enviar Pedido'
                )}
              </Button>
            </div>
            
            {orderId && (
              <Card className="mt-4 bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800 font-newjune-extrabold">
                        Pedido Confirmado!
                      </h4>
                      <p className="text-sm text-green-700 font-newjune-regular">
                        ID do Pedido: <span className="font-bold">{orderId}</span>
                      </p>
                      <p className="text-sm text-green-600 mt-1 font-newjune-regular">
                        Guarde este número para acompanhar seu pedido
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
