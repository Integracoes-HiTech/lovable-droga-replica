-- Adicionar coluna pedidos_itens na tabela pedidos
ALTER TABLE pedidos 
ADD COLUMN pedidos_itens JSONB;

-- Comentário para documentar a coluna
COMMENT ON COLUMN pedidos.pedidos_itens IS 'Array JSON com os itens do pedido (produtos, quantidades, preços)';

-- Exemplo de estrutura dos dados que serão salvos:
-- [
--   {
--     "productId": "produto-1",
--     "productName": "Omeprazol 20mg",
--     "quantity": 2,
--     "unitPrice": 25.90,
--     "totalPrice": 51.80,
--     "imageUrl": "/images/produtos/produto-1.jpg"
--   }
-- ]
