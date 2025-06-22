"useCliente";

import { ClienteItf } from '@/utils/types/ClienteItf';
import { create } from 'zustand';


type ClienteStore = {
  cliente: ClienteItf | null;
  logaCliente: (clienteLogado: ClienteItf) => void;
  deslogaCliente: () => void;
};

export const useClienteStore = create<ClienteStore>((set) => ({
  cliente: null,
  logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),
  deslogaCliente: () => {
    localStorage.removeItem("clienteKey");
    localStorage.removeItem("token");
    set({ cliente: null });
  },
}));

// ✅ Hook para restaurar cliente com base em clienteKey
