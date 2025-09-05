# Configuração do Supabase para Drogaria Popular

## 📋 Passos para Configurar o Banco de Dados

### 1. Acesse o Supabase Dashboard
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Acesse o projeto: `xppamrcaxbvdqkhkwqbf`

### 2. Execute o Script SQL
- No dashboard do Supabase, vá para **SQL Editor**
- Copie e cole o conteúdo do arquivo `supabase-setup.sql`
- Clique em **Run** para executar o script

### 3. Verifique a Tabela
- Vá para **Table Editor**
- Confirme que a tabela `orders` foi criada com as seguintes colunas:
  - `id` (TEXT, PRIMARY KEY)
  - `customer_phone` (TEXT)
  - `items` (JSONB)
  - `total_amount` (DECIMAL)
  - `status` (TEXT)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

### 4. Teste a Conexão
- Execute o projeto: `npm run dev`
- Faça um pedido de teste
- Verifique no console se aparece "Pedido salvo no Supabase"

## 🔧 Configurações do Projeto

### Variáveis de Ambiente (Opcional)
Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://xppamrcaxbvdqkhkwqbf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwcGFtcmNheGJ2ZHFraGt3cWJmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjkzNTM1MSwiZXhwIjoyMDcyNTExMzUxfQ.Rv9GdHxiEd_-FZPqWaS9SBongrcBa0pv7s9rVLEJ2KA
```

### Estrutura da Tabela Orders

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Funcionalidades Implementadas

### ✅ Salvamento de Pedidos
- Telefone do cliente
- Lista de produtos com quantidades
- Valor total calculado
- Status inicial: 'pending'
- Timestamps automáticos

### ✅ Consulta de Pedidos
- Lista todos os pedidos
- Busca por telefone
- Busca por ID do pedido
- Filtro por status
- Ordenação por data

### ✅ Atualização de Status
- Confirmado
- Processando
- Entregue
- Cancelado

### ✅ Estatísticas
- Total de pedidos
- Valor total
- Clientes únicos
- Pedidos do dia

## 🔍 Como Testar

1. **Faça um pedido:**
   - Adicione produtos ao carrinho
   - Clique em "Finalizar Pedido"
   - Digite um telefone
   - Clique em "Enviar Pedido"

2. **Verifique no Supabase:**
   - Vá para **Table Editor**
   - Clique na tabela `orders`
   - Veja o pedido salvo

3. **Visualize na aplicação:**
   - Clique em "Acompanhar Pedidos" no header
   - Veja todos os pedidos salvos
   - Teste os filtros e busca

## 📊 Logs de Debug

Os logs aparecem no console do navegador:
- `Pedido salvo no Supabase: {...}`
- `Erro do Supabase: {...}` (se houver erro)

## 🔒 Segurança

- A chave de API está configurada para `service_role`
- Row Level Security (RLS) está comentado por padrão
- Para produção, considere habilitar RLS e configurar políticas adequadas

## 🛠️ Troubleshooting

### Erro: "relation 'orders' does not exist"
- Execute o script SQL no Supabase
- Verifique se a tabela foi criada

### Erro: "permission denied"
- Verifique se a chave de API está correta
- Confirme se RLS não está habilitado sem políticas

### Pedidos não aparecem
- Verifique a conexão com o Supabase
- Confirme se os dados estão sendo salvos
- Verifique os logs no console
