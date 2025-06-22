"use client";
import { useRouter } from "next/navigation";
import { useEventosStore } from "@/context/EventosStore";
import { CardEvento } from "@/components/CardEvento";
import { SecaoCidadesPopulares } from "@/components/SecaoCidadesPopulares";
import { SecaoRevendas } from "@/components/SecaoRevendas";
import { useEffect } from "react";
import RevendaIngresso from "@/components/RevendaIngresso";
import { SecaoGeneros } from "@/components/SecaoGeneros";

export default function Home() {
  const { eventos, setEventos, limparFiltros } = useEventosStore();
  const router = useRouter();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/events`);
      const dados = await response.json();
      setEventos(dados);
    }
    buscaDados();
  }, [setEventos]);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <img
          src="/banner.png"
          alt="Banner promocional"
          className="w-full max-h-120"
        />
      </div>
      <div>
        <SecaoCidadesPopulares />
        <SecaoGeneros />
        {eventos.length > 0 && (
          <div className="max-w-5xl mx-auto mt-10">
            <div id="eventos" className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Eventos Disponíveis</h2>
              <button
                onClick={limparFiltros}
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
              >
                Limpar busca
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {eventos.map((evento) => (
                <CardEvento key={evento.id} data={evento} />
              ))}
            </div>
          </div>
        )}


        <SecaoRevendas />
      </div>
    </>
  );
}
