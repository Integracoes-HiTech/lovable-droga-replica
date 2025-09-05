import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { products as mockProducts, type Product } from "@/lib/products"
import { useCart } from "@/contexts/CartContext"
import { useNotification } from "@/hooks/use-notification"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

type Props = {
  title?: string
  products?: Product[]
}

export default function ProductsGrid({ title = "Produtos em destaque", products = mockProducts }: Props) {
  const { addToCart } = useCart();
  const { showProductAdded } = useNotification();

  // Filtrar apenas os produtos que funcionam (Dipirona, Omeprazol, Vitamina C e Paracetamol)
  const workingProducts = products.filter(product => 
    product.id === "1" || // Paracetamol 500mg
    product.id === "3" || // Dipirona 500mg
    product.id === "4" || // Omeprazol 20mg
    product.id === "16"   // Vitamina C 1000mg
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showProductAdded(product.name);
  };

  const getProductLink = (product: Product) => {
    // Mapear IDs dos produtos para parâmetros de URL
    const productMap: { [key: string]: string } = {
      "1": "paracetamol",
      "3": "dipirona", 
      "4": "omeprazol",
      "16": "vitamina-c"
    };
    
    const productParam = productMap[product.id] || product.id;
    return `/catalogo?produto=${productParam}`;
  };

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-primary font-newjune-extrabold">{title}</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workingProducts.map((p) => (
          <Link key={p.id} to={getProductLink(p)} className="block">
            <Card className="group overflow-hidden border-none bg-white shadow-md hover:shadow-lg transition cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {p.discount && (
                  <Badge className="absolute top-2 left-2 bg-[#e41e3c] text-white font-newjune-extrabold">
                    -{p.discount}%
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="text-base font-semibold text-gray-900 font-newjune-extrabold">{p.name}</h3>
                {p.subtitle && <p className="mt-1 text-sm text-muted-foreground line-clamp-2 font-newjune-regular">{p.subtitle}</p>}

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.originalPrice && (
                      <span className="text-sm text-gray-500 line-through font-newjune-regular">
                        {p.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    )}
                    <span className="text-xl font-bold text-[#e41e3c] font-newjune-extrabold">
                      {p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>

                  <Button 
                    size="sm" 
                    className="bg-[#e41e3c] hover:bg-[#c41e3c] flex items-center gap-2 font-newjune-extrabold"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
