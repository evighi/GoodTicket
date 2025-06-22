"use client";

import { RevendaItf } from "@/utils/types/RevendaItf";
import { toast } from "sonner";

export function CardRevenda({ data }: { data: RevendaItf }) {
  function abrirWhatsapp() {
    const mensagem = `Olá! Tenho interesse na revenda para o evento "${data.descricaoEvento}".`;
    const url = `https://wa.me/${data.numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  const imagem = data.eventoImagem || "/sem-imagem.png";

  return (
    <div
      className="max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      style={{ backgroundColor: "rgba(48, 48, 54, 1)", color: "#fff" }}
    >
      <img
        className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        src={imagem}
        alt={`Imagem do evento ${data.descricaoEvento}`}
        onClick={abrirWhatsapp}
      />

      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold truncate">
          🎫 {data.descricaoEvento}
        </h5>

        <p className="text-sm text-gray-400 mb-1">
          📍 <span className="font-medium">{data.eventoLocal}</span>
        </p>

        <p className="text-sm text-gray-400 mb-1">
          👤 <span className="font-medium">Anunciante: {data.cliente.nome}</span>
        </p>

        <p className="text-sm text-gray-400 mb-1">
          🎟️ Quantidade: <span className="font-medium">{data.quantidade}</span>
        </p>

        <p className="text-sm text-gray-400 mb-1">
          💰 De: <span className="line-through">R$ {data.precoOriginal.toFixed(2)}</span> por{" "}
          <strong>R$ {data.precoRevenda.toFixed(2)}</strong>
        </p>

        <p className="text-sm text-gray-400 mb-3">
          📅 Anúncio: {new Date(data.dataAnuncio).toLocaleDateString()}
        </p>

        <button
          onClick={abrirWhatsapp}
          className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300 cursor-pointer"
        >
          Negociar no WhatsApp
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
