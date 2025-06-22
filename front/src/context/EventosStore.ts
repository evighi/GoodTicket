// context/EventosStore.ts
import { create } from "zustand";
import { EventoItf } from "@/utils/types/EventoItf";

interface EventosStore {
  eventos: EventoItf[];
  setEventos: (eventos: EventoItf[]) => void;
  limparFiltros: () => void;
}

export const useEventosStore = create<EventosStore>((set) => ({
  eventos: [],
  setEventos: (eventos) => set({ eventos }),
  limparFiltros: () => set({ eventos: [] }), // ← limpa o array de eventos
}));
