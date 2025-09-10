import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/hooks/use-notification';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showProductAdded } = useNotification();
  const [quantity, setQuantity] = useState(1);

  // Mapear parâmetros de URL para IDs dos produtos
  const productMap: { [key: string]: string } = {
    "paracetamol": "1",
    "ibuprofeno": "2",
    "dipirona": "3", 
    "omeprazol": "4",
    "loratadina": "5",
    "protetor-solar": "6",
    "hidratante-facial": "7",
    "shampoo-anticaspa": "8",
    "desodorante": "9",
    "creme-maos": "10",
    "escova-dentes": "11",
    "pasta-dente": "12",
    "fio-dental": "13",
    "sabonete-liquido": "14",
    "papel-higienico": "15",
    "vitamina-c": "16",
    "vitamina-d": "17",
    "omega-3": "18",
    "whey-protein": "19",
    "multivitaminico": "20",
    "fralda-bebe": "21",
    "leite-po": "22",
    "shampoo-bebe": "23",
    "creme-assadura": "24",
    "mamadeira": "25",
    "joelheira": "26",
    "bengala": "27",
    "cinta-lombar": "28",
    "tornozeleira": "29",
    "colar-cervical": "30",
    "glicosimetro": "31",
    "tiras-glicose": "32",
    "lancetas": "33",
    "adocante": "34",
    "chocolate-diet": "35",
    "band-aid": "36",
    "alcool": "37",
    "soro-fisiologico": "38",
    "gaze": "39",
    "atadura": "40"
  };

  const productId = productMap[id || ''] || id || '';
  const product = products.find(p => p.id === productId);

  // Scroll para o topo sempre que navegar para uma nova página
  useScrollToTop();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/')} className="bg-[#e41e3c] hover:bg-[#c41e3c]">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showProductAdded(`${product.name} (${quantity}x)`);
  };

  const getProductLink = (productId: string) => {
    // Mapear IDs dos produtos para parâmetros de URL amigáveis
    const productMap: { [key: string]: string } = {
      "1": "paracetamol",
      "2": "ibuprofeno",
      "3": "dipirona", 
      "4": "omeprazol",
      "5": "loratadina",
      "6": "protetor-solar",
      "7": "hidratante-facial",
      "8": "shampoo-anticaspa",
      "9": "desodorante",
      "10": "creme-maos",
      "11": "escova-dentes",
      "12": "pasta-dente",
      "13": "fio-dental",
      "14": "sabonete-liquido",
      "15": "papel-higienico",
      "16": "vitamina-c",
      "17": "vitamina-d",
      "18": "omega-3",
      "19": "whey-protein",
      "20": "multivitaminico",
      "21": "fralda-bebe",
      "22": "leite-po",
      "23": "shampoo-bebe",
      "24": "creme-assadura",
      "25": "mamadeira",
      "26": "joelheira",
      "27": "bengala",
      "28": "cinta-lombar",
      "29": "tornozeleira",
      "30": "colar-cervical",
      "31": "glicosimetro",
      "32": "tiras-glicose",
      "33": "lancetas",
      "34": "adocante",
      "35": "chocolate-diet",
      "36": "band-aid",
      "37": "alcool",
      "38": "soro-fisiologico",
      "39": "gaze",
      "40": "atadura"
    };
    
    const productParam = productMap[productId] || productId;
    return `/produto/${productParam}`;
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-16">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#e41e3c]">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#e41e3c]">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Imagem do produto */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.discount && (
                <Badge className="bg-[#e41e3c] text-white font-newjune-extrabold px-3 py-1">
                  -{product.discount}% OFF
                </Badge>
              )}
              <Badge className="bg-green-500 text-white font-newjune-extrabold px-3 py-1">
                Em estoque
              </Badge>
              <Badge className="bg-blue-500 text-white font-newjune-extrabold px-3 py-1">
                Qualidade garantida
              </Badge>
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-newjune-extrabold mb-2">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-lg text-gray-600 font-newjune-regular mb-4">
                  {product.subtitle}
                </p>
              )}
              
              {/* Avaliações */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-newjune-regular">
                  (4.8) • 127 avaliações
                </span>
              </div>
            </div>

            {/* Preços */}
            <div className="space-y-2">
              {product.originalPrice && (
                <p className="text-lg text-gray-500 line-through font-newjune-regular">
                  De: {product.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              )}
              <p className="text-4xl font-bold text-[#e41e3c] font-newjune-extrabold">
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
              {product.discount && (
                <p className="text-sm text-green-600 font-newjune-regular">
                  Você economiza {((product.originalPrice || 0) - product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              )}
            </div>

            {/* Descrição */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 font-newjune-extrabold mb-2">
                  Descrição
                </h3>
                <p className="text-gray-600 font-newjune-regular leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Informações Obrigatórias */}
            <div className="space-y-4">
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 font-newjune-extrabold mb-4 flex items-center gap-2">
                  <span className="text-[#e41e3c]">{product.isMedication ? '💊' : '📋'}</span>
                  Informações Obrigatórias - {product.isMedication ? 'Medicamento' : 'Produto'}
                </h3>
                
                <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {/* Nome comercial */}
                  <div>
                    <h4 className="font-semibold text-gray-900 font-newjune-extrabold text-sm mb-1">
                      Nome comercial:
                    </h4>
                    <p className="text-gray-700 font-newjune-regular">
                      {product.name}
                    </p>
                  </div>

                  {/* Substância ativa */}
                  {product.activeSubstance && (
                    <div>
                      <h4 className="font-semibold text-gray-900 font-newjune-extrabold text-sm mb-1">
                        {product.isMedication ? 'Substância ativa:' : 'Princípio ativo:'}
                      </h4>
                      <p className="text-gray-700 font-newjune-regular">
                        {product.activeSubstance}
                      </p>
                    </div>
                  )}

                  {/* Registro Anvisa */}
                  {product.anvisaRegistration && (
                    <div>
                      <h4 className="font-semibold text-gray-900 font-newjune-extrabold text-sm mb-1">
                        Registro Anvisa:
                      </h4>
                      <p className="text-gray-700 font-newjune-regular text-xs">
                        {product.anvisaRegistration}
                      </p>
                    </div>
                  )}

                  {/* Indicação terapêutica */}
                  {product.therapeuticIndication && (
                    <div>
                      <h4 className="font-semibold text-gray-900 font-newjune-extrabold text-sm mb-1">
                        {product.isMedication ? 'Indicação terapêutica:' : 'Indicação de uso:'}
                      </h4>
                      <p className="text-gray-700 font-newjune-regular">
                        {product.therapeuticIndication}
                      </p>
                    </div>
                  )}

                  {/* Advertência obrigatória */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-600 text-lg">⚠️</span>
                      <p className="text-yellow-800 font-newjune-extrabold text-sm">
                        <strong>Advertência obrigatória:</strong> Se persistirem os sintomas, o médico deverá ser consultado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seletor de quantidade */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 font-newjune-extrabold">
                Quantidade
              </h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 rounded-full"
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
                  className="w-10 h-10 rounded-full"
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#e41e3c] hover:bg-[#c41e3c] text-white font-newjune-extrabold py-3 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Informações de entrega */}
            <Card className="bg-gradient-to-r from-[#e41e3c]/5 to-[#e41e3c]/10 border-[#e41e3c]/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#e41e3c] font-newjune-extrabold mb-3">
                  Informações de Entrega
                </h3>
                <div className="space-y-2 text-sm text-gray-700 font-newjune-regular">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#e41e3c]" />
                    <span>Frete grátis para compras acima de R$ 200,00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#e41e3c]" />
                    <span>Entrega segura e protegida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-[#e41e3c]" />
                    <span>Troca e devolução em até 7 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Produtos relacionados */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-newjune-extrabold mb-6">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} to={getProductLink(relatedProduct.id)} className="block">
                  <Card className="group overflow-hidden border-none bg-white shadow-md hover:shadow-lg transition cursor-pointer">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      {relatedProduct.discount && (
                        <Badge className="absolute top-2 left-2 bg-[#e41e3c] text-white font-newjune-extrabold">
                          -{relatedProduct.discount}%
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="text-base font-semibold text-gray-900 font-newjune-extrabold">
                        {relatedProduct.name}
                      </h3>
                      {relatedProduct.subtitle && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 font-newjune-regular">
                          {relatedProduct.subtitle}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-newjune-regular">
                              {relatedProduct.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          )}
                          <span className="text-lg font-bold text-[#e41e3c] font-newjune-extrabold">
                            {relatedProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
