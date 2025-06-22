"use client";
import { useClienteStore } from "@/context/ClienteContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// Interface vinda da API da Sympla
export interface EventoSympla {
  id: string;
  name: string;
  event_url: string;
  image_url?: string;
  city?: string;
  start_date?: string; // "dd/mm/yyyy HH:MM"
}

export function CardEvento({ data }: { data: EventoSympla }) {
  const { cliente } = useClienteStore();
  const router = useRouter();

  const imagem = data.image_url || "/sem-imagem.png";

  function handleAbrirSympla() {
    if (!data.event_url) {
      toast.error("Link para o evento não encontrado.");
      return;
    }
    window.open(data.event_url, "_blank");
  }

  return (
    <div className="max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      style={{ backgroundColor: "rgba(48, 48, 54, 1)", color: "#fff" }}>
      <img
        className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={handleAbrirSympla}
        src={imagem}
        alt={`Imagem do evento ${data.name}`}
      />
      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white truncate">
          {data.name}
        </h5>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          📍 <span className="font-medium">{data.city || "Cidade não informada"}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          📅 <span className="font-medium">{data.start_date || "Data não informada"}</span>
        </p>
        <button
          onClick={handleAbrirSympla}
          className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300 cursor-pointer"
        >
          Ver na Sympla
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
