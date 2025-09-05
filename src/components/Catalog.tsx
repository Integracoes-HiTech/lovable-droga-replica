import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { products, categories, type Product, type Category } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/hooks/use-notification';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'discount'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { showProductAdded } = useNotification();

  // Processar parâmetros da URL
  useEffect(() => {
    const categoria = searchParams.get('categoria');
    const subcategoria = searchParams.get('subcategoria');
    const produto = searchParams.get('produto');
    const busca = searchParams.get('busca');
    
    if (categoria) {
      setSelectedCategory(categoria);
    }
    
    if (produto) {
      setSearchTerm(produto.replace(/-/g, ' '));
    }
    
    if (busca) {
      setSearchTerm(busca);
    }
  }, [searchParams]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showProductAdded(product.name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('busca', searchTerm.trim());
      setSearchParams(newSearchParams);
    }
  };

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por termo de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar produtos
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'discount':
          aValue = a.discount || 0;
          bValue = b.discount || 0;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header do Catálogo */}
      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-bold text-[#e41e3c] font-newjune-extrabold mb-2">
          Catálogo de Produtos
        </h1>
        <p className="text-gray-600 font-newjune-regular">
          Encontre os melhores produtos para sua saúde e bem-estar
        </p>
      </div>

             {/* Barra de Pesquisa e Filtros */}
       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
         <div className="flex flex-col lg:flex-row gap-4">
                      {/* Filtro de Categoria */}
           <div className="flex gap-2 w-full justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="font-newjune-regular"
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="font-newjune-regular"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Controles de Visualização */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-newjune-regular">
              {filteredProducts.length} produtos encontrados
            </span>
            
            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-newjune-regular">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'discount')}
                className="text-sm border rounded px-2 py-1 font-newjune-regular"
              >
                <option value="name">Nome</option>
                <option value="price">Preço</option>
                <option value="discount">Desconto</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="font-newjune-regular"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>

          {/* Modo de Visualização */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className={viewMode === 'grid' 
        ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <Card key={product.id} className={`group overflow-hidden border-none bg-white shadow-md hover:shadow-lg transition ${viewMode === 'list' ? 'flex' : ''}`}>
            <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'aspect-[4/3]'} overflow-hidden bg-gray-50`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-[#e41e3c] text-white font-newjune-extrabold">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs font-newjune-regular">
                  {getCategoryName(product.category)}
                </Badge>
              </div>

              <h3 className="text-base font-semibold text-gray-900 font-newjune-extrabold mb-1">
                {product.name}
              </h3>
              
              {product.subtitle && (
                <p className="text-sm text-muted-foreground line-clamp-2 font-newjune-regular mb-2">
                  {product.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2 mb-3">
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through font-newjune-regular">
                    {product.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                )}
                <span className="text-xl font-bold text-[#e41e3c] font-newjune-extrabold">
                  {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>

              <Button 
                size="sm" 
                className="w-full bg-[#e41e3c] hover:bg-[#c41e3c] flex items-center gap-2 font-newjune-extrabold"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4" />
                Adicionar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mensagem quando não há produtos */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 font-newjune-extrabold mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500 font-newjune-regular">
            Tente ajustar os filtros ou termos de pesquisa
          </p>
        </div>
      )}
    </div>
  );
}
