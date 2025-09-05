import { supabase } from './supabase';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  numero_referencia: string;
  cliente_nome: string;
  cliente_telefone: string;
  status: 'PENDENTE' | 'CONFIRMADO' | 'PROCESSANDO' | 'ENTREGUE' | 'CANCELADO';
  valor_total: number;
  observacoes: string;
  items: OrderItem[];
  created_at: Date;
  updated_at: Date;
}

// Função para descobrir valores válidos do ENUM
export const getValidStatusValues = async (): Promise<string[]> => {
  try {
    console.log('Descobrindo valores válidos do ENUM...');
    
    // Lista extensa de possíveis valores de status
    const possibleStatuses = [
      'PENDENTE', 'PENDING', 'AGUARDANDO', 'NOVO', 'PEND', 'WAITING', 'NEW',
      'PENDENT', 'AGUARD', 'INICIAL', 'ABERTO', 'CRIADO', 'RECEBIDO',
      'PENDENTE', 'CONFIRMADO', 'PROCESSANDO', 'ENTREGUE', 'CANCELADO',
      'PENDING', 'CONFIRMED', 'PROCESSING', 'DELIVERED', 'CANCELLED',
      'AGUARDANDO', 'CONFIRMADO', 'EM_PROCESSAMENTO', 'ENTREGUE', 'CANCELADO',
      'WAITING', 'CONFIRMED', 'PROCESSING', 'DELIVERED', 'CANCELLED'
    ];

    console.log('Tentando descobrir ENUM testando inserções...');
    return possibleStatuses;

  } catch (error) {
    console.error('Erro ao descobrir valores do ENUM:', error);
    return ['PENDENTE', 'PENDING', 'AGUARDANDO', 'NOVO'];
  }
};

// Função para gerar número de referência único
const generateNumeroReferencia = (): string => {
  return `PED-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
};

// Função para gerar ID numérico único
const generateNumericId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// Função para salvar pedido no Supabase
export const saveOrder = async (customerName: string, customerPhone: string, items: CartItem[], observations?: string): Promise<Order> => {
  try {
    console.log('Iniciando salvamento do pedido...');
    console.log('Nome:', customerName);
    console.log('Telefone:', customerPhone);
    console.log('Observações:', observations);
    console.log('Itens:', items);

    // Calcular valor total
    const valorTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    console.log('Valor total:', valorTotal);

    // Criar objeto do pedido simplificado
    const orderItems = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: item.product.price * item.quantity,
      imageUrl: item.product.imageUrl
    }));

    const numeroReferencia = `PED-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const numericId = generateNumericId();

    // Dados para salvar no banco - SEM status por enquanto
    const orderData = {
      id: numericId,
      numero_referencia: numeroReferencia,
      cliente_nome: customerName,
      cliente_telefone: customerPhone,
      valor_total: valorTotal,
      produtos: `Pedido online - ${items.length} item(s) - Produtos: ${items.map(item => `${item.product.name} (${item.quantity}x)`).join(', ')}`,
      observacoes: observations || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Dados para salvar:', orderData);

    // Salvar no Supabase
    const { data, error } = await supabase
      .from('pedidos')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Erro do Supabase:', error);
      throw new Error(`Falha ao salvar o pedido: ${error.message}`);
    }

    console.log('Pedido salvo com sucesso:', data);

    // Retornar objeto do pedido
    return {
      id: numericId.toString(),
      numero_referencia: numeroReferencia,
      cliente_nome: customerName,
      cliente_telefone: customerPhone,
      status: 'PENDENTE' as Order['status'], // Valor fixo para teste
      valor_total: valorTotal,
      observacoes: observations || '',
      items: orderItems,
      created_at: new Date(),
      updated_at: new Date()
    };

  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    throw new Error('Falha ao salvar o pedido. Tente novamente.');
  }
};

// Função para buscar todos os pedidos
export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro do Supabase:', error);
      throw error;
    }

    return data.map((order: { id: string; numero_referencia: string; cliente_nome: string; cliente_telefone: string; status: string; valor_total: number; observacoes: string; pedidos_itens: OrderItem[]; created_at: string; updated_at: string }) => ({
      id: order.id,
      numero_referencia: order.numero_referencia,
      cliente_nome: order.cliente_nome,
      cliente_telefone: order.cliente_telefone,
      status: order.status as Order['status'],
      valor_total: order.valor_total,
      observacoes: order.observacoes,
      items: order.pedidos_itens || [], // Usar os itens da coluna pedidos_itens
      created_at: new Date(order.created_at),
      updated_at: new Date(order.updated_at)
    }));
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return [];
  }
};

// Função para buscar pedido por ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Erro do Supabase:', error);
      return null;
    }

    return {
      id: data.id,
      numero_referencia: data.numero_referencia,
      cliente_nome: data.cliente_nome,
      cliente_telefone: data.cliente_telefone,
      status: data.status,
      valor_total: data.valor_total,
      observacoes: data.observacoes,
      items: data.pedidos_itens || [], // Usar os itens da coluna pedidos_itens
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return null;
  }
};

// Função para atualizar status do pedido
export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Erro do Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      numero_referencia: data.numero_referencia,
      cliente_nome: data.cliente_nome,
      cliente_telefone: data.cliente_telefone,
      status: data.status,
      valor_total: data.valor_total,
      observacoes: data.observacoes,
      items: data.pedidos_itens || [], // Usar os itens da coluna pedidos_itens
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    throw error;
  }
};

// Função para buscar pedidos por telefone
export const getOrdersByPhone = async (phone: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('cliente_telefone', phone)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro do Supabase:', error);
      throw error;
    }

    return data.map((order: { id: string; numero_referencia: string; cliente_nome: string; cliente_telefone: string; status: string; valor_total: number; observacoes: string; pedidos_itens: OrderItem[]; created_at: string; updated_at: string }) => ({
      id: order.id,
      numero_referencia: order.numero_referencia,
      cliente_nome: order.cliente_nome,
      cliente_telefone: order.cliente_telefone,
      status: order.status as Order['status'],
      valor_total: order.valor_total,
      observacoes: order.observacoes,
      items: order.pedidos_itens || [], // Usar os itens da coluna pedidos_itens
      created_at: new Date(order.created_at),
      updated_at: new Date(order.updated_at)
    }));
  } catch (error) {
    console.error('Erro ao buscar pedidos por telefone:', error);
    return [];
  }
};
