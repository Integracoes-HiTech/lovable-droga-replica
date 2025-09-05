-- Script SQL para criar a tabela 'orders' no Supabase
-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Habilitar Row Level Security (RLS) - opcional
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções (se RLS estiver habilitado)
-- CREATE POLICY "Allow insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Política para permitir leitura (se RLS estiver habilitado)
-- CREATE POLICY "Allow read orders" ON orders FOR SELECT USING (true);

-- Política para permitir atualizações (se RLS estiver habilitado)
-- CREATE POLICY "Allow update orders" ON orders FOR UPDATE USING (true);

-- Função para atualizar automaticamente o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
