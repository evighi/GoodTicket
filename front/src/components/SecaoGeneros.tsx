"use client";

import { useEventosStore } from "@/context/EventosStore";
import { toast } from "sonner";

const generos = [
  { nome: "Rock", imagem: "/generos/rock.jpg" },
  { nome: "Funk", imagem: "/generos/funk.jpg" },
  { nome: "Pagode", imagem: "/generos/pagode.jpg" },
  { nome: "Sertanejo", imagem: "/generos/sertanejo.jpg" },
  { nome: "MPB", imagem: "/generos/mpb.jpg" },
  { nome: "Eletrônica", imagem: "/generos/eletronica.jpg" },
];

export function SecaoGeneros() {
  const { setEventos } = useEventosStore();

  async function buscarEventosPorGenero(genero: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/symplaPython/eventos-python?search=${encodeURIComponent(genero)}`
      );
      const dados = await response.json();

      if (dados.length === 0) {
        toast.error(`Nenhum evento encontrado para o gênero ${genero}.`);
        return;
      }

      setEventos(dados);
      setTimeout(() => {
        const secaoEventos = document.getElementById("eventos");
        if (secaoEventos) {
          secaoEventos.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      toast.error("Erro ao buscar eventos por gênero. Tente novamente mais tarde.");
    }
  }

  return (
    <section className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Explore por Gênero</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {generos.map((genero) => (
          <div
            key={genero.nome}
            onClick={() => buscarEventosPorGenero(genero.nome)}
            className="h-[140px] relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={genero.imagem}
              alt={genero.nome}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center p-2">
              <span className="text-white text-md font-semibold drop-shadow-md">
                {genero.nome}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
