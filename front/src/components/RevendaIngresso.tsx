"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { InputPesquisa } from "@/components/InputPesquisa";
import { useEventosStore } from "@/context/EventosStore";
import { useRouter } from "next/navigation";
import { NumericFormat } from 'react-number-format';


interface Evento {
    id: string;
    name: string;
    event_url: string;
    image_url?: string;
    city?: string;
    start_date?: string;
}

export default function RevendaIngresso() {
    const { eventos } = useEventosStore();
    const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
    const [quantidade, setQuantidade] = useState(1);
    const [precoOriginal, setPrecoOriginal] = useState(0);
    const [precoRevenda, setPrecoRevenda] = useState(0);
    const [numeroTelefone, setNumeroTelefone] = useState("");
    const [status, setStatus] = useState("disponivel");
    const router = useRouter();
    const [clienteId, setClienteId] = useState<string | null>(null);

    useEffect(() => {
        const clienteId = typeof window !== "undefined" ? localStorage.getItem("clienteKey") : null;
        const token = localStorage.getItem("token");

        if (!clienteId || !token) {
            toast.error("Você precisa estar logado para cadastrar uma revenda.");
            router.push("/login");
            return;
        }

        setClienteId(clienteId);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!eventoSelecionado || !clienteId || !token) {
            toast.error("Dados de autenticação inválidos.");
            return;
        }

        const payload = {
            clienteId,
            eventoId: eventoSelecionado.id,
            eventoUrl: eventoSelecionado.event_url,
            eventoImagem: eventoSelecionado.image_url,
            descricaoEvento: eventoSelecionado.name,
            eventoLocal: eventoSelecionado.city || "",
            dataAnuncio: new Date(),
            quantidade,
            precoOriginal,
            precoRevenda,
            numeroTelefone,
            status,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/revendas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Erro ao criar revenda");

            toast.success("Revenda cadastrada com sucesso!");
            setEventoSelecionado(null);
            setQuantidade(1);
            setPrecoOriginal(0);
            setPrecoRevenda(0);
            setNumeroTelefone("");
            router.push("/");
        } catch (err) {
            toast.error("Erro ao cadastrar revenda");
            console.error(err);
        }
    }

    return (
        <div
            style={{ backgroundColor: "rgba(36, 36, 40, 1)" }}
            className="max-w-5xl mx-auto mt-10 p-6 rounded-xl text-white shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-6 text-center cursor-pointer">Cadastrar Revenda</h2>

            <div className="mb-4">
                <InputPesquisa />
            </div>

            {!eventoSelecionado && (
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {eventos.map((evento) => (
                        <div
                            key={evento.id}
                            className={`bg-zinc-800 rounded-lg overflow-hidden shadow transition hover:shadow-md`}
                        >
                            {evento.image_url && (
                                <img
                                    src={evento.image_url}
                                    alt={evento.name}
                                    className="w-full h-36 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <p className="font-semibold text-white text-sm truncate">
                                    {evento.name}
                                </p>
                                <p className="text-gray-400 text-sm">📍 {evento.city}</p>
                                <button
                                    onClick={() => setEventoSelecionado(evento)}
                                    className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-md text-sm font-medium cursor-pointer"
                                >
                                    Escolher Evento
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {eventoSelecionado && (
                <div className="bg-zinc-800 p-4 rounded-md mb-6">
                    <h3 className="text-lg font-semibold mb-2">Evento Selecionado:</h3>
                    <div className="flex items-center gap-4">
                        {eventoSelecionado.image_url && (
                            <img
                                src={eventoSelecionado.image_url}
                                alt={eventoSelecionado.name}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                        )}
                        <div>
                            <p className="text-sm">🎫 {eventoSelecionado.name}</p>
                            <p className="text-sm">📍 {eventoSelecionado.city}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setEventoSelecionado(null)}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm cursor-pointer"
                    >
                        Trocar Evento
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-zinc-200">Quantidade de Ingressos</label>
                        <input
                            type="number"
                            placeholder="Ex: 2"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-zinc-200">Valor Original (R$)</label>
                            <NumericFormat
                                value={precoOriginal}
                                onValueChange={(values) => setPrecoOriginal(values.floatValue || 0)}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                placeholder="Ex: R$ 100,00"
                                allowNegative={false}
                                className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-zinc-200">Valor da Revenda (R$)</label>
                            <NumericFormat
                                value={precoRevenda}
                                onValueChange={(values) => setPrecoRevenda(values.floatValue || 0)}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                placeholder="Ex: R$ 120,00"
                                allowNegative={false}
                                className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>


                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-zinc-200">WhatsApp (somente números)</label>
                        <input
                            type="text"
                            placeholder="Ex: 51991234567"
                            value={numeroTelefone}
                            onChange={(e) => setNumeroTelefone(e.target.value)}
                            className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition cursor-pointer"
                >
                    Cadastrar Revenda
                </button>
            </form>

        </div>
    );
}
