-- Atualização da estrutura da tabela pedidos
-- Executar no Supabase SQL Editor

-- 1. Renomear coluna observacoes para produtos (se necessário)
-- ALTER TABLE pedidos RENAME COLUMN observacoes TO produtos;

-- 2. Adicionar coluna observacoes se não existir
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS observacoes TEXT DEFAULT '';

-- 3. Verificar estrutura atual
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'pedidos' 
ORDER BY ordinal_position;

-- 4. Exemplo de dados atualizados
-- UPDATE pedidos SET 
--   produtos = 'Produtos do pedido',
--   observacoes = 'Observações do cliente'
-- WHERE observacoes IS NOT NULL;

-- 5. Verificar se a coluna produtos existe
SELECT EXISTS (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'pedidos' AND column_name = 'produtos'
) as produtos_exists;

-- 6. Se a coluna produtos não existir, criar
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pedidos' AND column_name = 'produtos'
  ) THEN
    ALTER TABLE pedidos ADD COLUMN produtos TEXT DEFAULT '';
  END IF;
END $$;
