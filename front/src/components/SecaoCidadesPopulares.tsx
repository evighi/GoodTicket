"use client";

import { useEventosStore } from "@/context/EventosStore";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cidades = [
  { nome: "São Paulo", imagem: "/cidades/sp.jpeg" },
  { nome: "Porto Alegre", imagem: "/cidades/poa.jpeg" },
  { nome: "Rio de Janeiro", imagem: "/cidades/rio.jpeg" },
  { nome: "Pelotas", imagem: "/cidades/pelotas.jpg" },
  { nome: "Florianópolis", imagem: "/cidades/florianopolis.jpeg" },
  { nome: "Recife", imagem: "/cidades/recife.jpeg" },
  { nome: "Santos", imagem: "/cidades/santos.jpeg" },
  { nome: "Brasília", imagem: "/cidades/brasilia.jpeg" },
];

export function SecaoCidadesPopulares() {
  const { setEventos } = useEventosStore();

  async function buscarEventos(cidade: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/symplaPython/eventos-python?search=${encodeURIComponent(cidade)}`
      );
      const dados = await response.json();

      if (dados.length === 0) {
        toast.error(`Nenhum evento encontrado em ${cidade}.`);
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
      toast.error("Erro ao buscar eventos. Tente novamente mais tarde.");
    }
  }

  return (
    <section className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Cidades Populares</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1.5}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {cidades.map((cidade) => (
          <SwiperSlide key={cidade.nome}>
            <div
              onClick={() => buscarEventos(cidade.nome)}
              className="h-[140px] relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={cidade.imagem}
                alt={cidade.nome}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center p-2">
                <span className="text-white text-md font-semibold drop-shadow-md">
                  {cidade.nome}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos personalizados para paginação e setas */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(20, 200, 113, 0.4);
          width: 12px;
          height: 12px;
          opacity: 1;
          transition: transform 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: rgba(20, 200, 113, 1);
          transform: scale(1.3);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: rgba(20, 200, 113, 1);
          font-size: 1.75rem;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 3.5rem;
        }
      `}</style>
    </section>
  );
}
