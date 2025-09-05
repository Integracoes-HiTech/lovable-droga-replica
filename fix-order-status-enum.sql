-- Verificar valores do ENUM order_status
SELECT unnest(enum_range(NULL::order_status)) AS enum_values;

-- Se precisar criar o ENUM com os valores corretos:
-- DROP TYPE IF EXISTS order_status CASCADE;
-- CREATE TYPE order_status AS ENUM ('PENDENTE', 'CONFIRMADO', 'PROCESSANDO', 'ENTREGUE', 'CANCELADO');

-- Se a tabela já existe, alterar a coluna status:
-- ALTER TABLE pedidos ALTER COLUMN status TYPE order_status USING status::order_status;

-- Verificar estrutura completa da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'pedidos'
ORDER BY ordinal_position;

-- Exemplo de inserção de teste
-- INSERT INTO pedidos (id, numero_referencia, cliente_nome, cliente_telefone, status, valor_total, observacoes)
-- VALUES (1756940491676123, 'PED-TESTE-001', 'Cliente Teste', '11999999999', 'PENDENTE', 100.00, 'Pedido de teste');
