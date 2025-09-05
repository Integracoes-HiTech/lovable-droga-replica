import { useToast } from "@/hooks/use-toast";

export const useNotification = () => {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: "Sucesso!",
      description: message,
      variant: "default",
    });
  };

  const showError = (message: string) => {
    toast({
      title: "Erro!",
      description: message,
      variant: "destructive",
    });
  };

  const showProductAdded = (productName: string) => {
    toast({
      title: "Produto adicionado!",
      description: `${productName} foi adicionado ao carrinho`,
      variant: "default",
    });
  };

  return {
    showSuccess,
    showError,
    showProductAdded,
  };
};
