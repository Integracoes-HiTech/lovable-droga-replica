-- Verificar estrutura atual da tabela pedidos
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'pedidos';

-- Se o ID estiver como BIGINT e você quiser usar TEXT, execute:
-- ALTER TABLE pedidos ALTER COLUMN id TYPE TEXT;

-- Se quiser manter como BIGINT (recomendado), a estrutura deve ser:
/*
CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT PRIMARY KEY,
    numero_referencia TEXT NOT NULL,
    cliente_nome TEXT NOT NULL,
    cliente_telefone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    valor_total DECIMAL(10,2) NOT NULL,
    observacoes TEXT,
    pedidos_itens JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_pedidos_telefone ON pedidos(cliente_telefone);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON pedidos(created_at);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pedidos_updated_at 
    BEFORE UPDATE ON pedidos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
