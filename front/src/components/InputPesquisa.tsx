"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventosStore } from "@/context/EventosStore";

type Inputs = {
  search: string;
};

type InputPesquisaProps = {
  onSearchComplete?: () => void;
};

export function InputPesquisa({ onSearchComplete }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { setEventos } = useEventosStore();

  async function enviaPesquisa(data: Inputs) {
    if (!data.search.trim()) {
      toast.warning("Digite um termo para buscar eventos.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/symplaPython/eventos-python?search=${encodeURIComponent(data.search)}`
      );
      const dados = await response.json();

      if (dados.length === 0) {
        toast.error("Nenhum evento encontrado com esse termo.");
        reset();
        return;
      }

      setEventos(dados);

      // Rola para a seção "eventos"
      setTimeout(() => {
        const secaoEventos = document.getElementById("eventos");
        if (secaoEventos) {
          secaoEventos.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      // Chama o callback para esconder o input
      if (onSearchComplete) {
        onSearchComplete();
      }

    } catch (error) {
      toast.error("Erro ao buscar eventos. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="bg-black/60 p-5 rounded-lg shadow-lg flex justify-center w-full">
      <form
        className="flex items-center gap-4 w-full max-w-6xl"
        onSubmit={handleSubmit(enviaPesquisa)}
      >
        <input
          type="text"
          id="search"
          className="flex-1 px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Buscar evento, artista ou local"
          {...register("search")}
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}

