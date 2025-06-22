"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { toast } from "sonner";
import { CardRevenda } from "./CardRevenda";
import { RevendaItf } from "@/utils/types/RevendaItf";

export function SecaoRevendas() {
  const [revendas, setRevendas] = useState<RevendaItf[]>([]);

  useEffect(() => {
    async function fetchRevendas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/revendas`);
        const data = await response.json();
        setRevendas(data);
      } catch (err) {
        toast.error("Erro ao carregar revendas.");
      }
    }

    fetchRevendas();
  }, []);

  return (
    <section className="relative max-w-5xl mx-auto my-10 px-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Revendas de Ingressos</h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {revendas.map((revenda) => (
            <SwiperSlide key={revenda.id}>
              <CardRevenda data={revenda} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Setas fora do carrossel */}
        <div className="absolute top-1/2 left-[-32px] transform -translate-y-1/2 z-10 cursor-pointer swiper-button-prev-custom text-emerald-500 hover:text-emerald-300 text-3xl">
          ❮
        </div>
        <div className="absolute top-1/2 right-[-32px] transform -translate-y-1/2 z-10 cursor-pointer swiper-button-next-custom text-emerald-500 hover:text-emerald-300 text-3xl">
          ❯
        </div>
      </div>
    </section>
  );
}
