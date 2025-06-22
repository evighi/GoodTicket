"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Cliente = {
  id: string;
  nome: string;
  email: string;
  numeroTelefone: string;
};

type Revenda = {
  id: string;
  eventoImagem: string;
  descricaoEvento: string;
  eventoLocal: string;
  precoRevenda: number;
  quantidade: number;
  status: string;
  cliente: Cliente;
};

export default function PaginaAdmin() {
  const router = useRouter();
  const [verificandoAdmin, setVerificandoAdmin] = useState(true);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [revendas, setRevendas] = useState<Revenda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState<"usuarios" | "revendas">("usuarios");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("tipo");

    if (!token || tipo !== "admin") {
      toast.error("Acesso restrito! Apenas administradores podem acessar.");
      router.push("/login");
    } else {
      setVerificandoAdmin(false);
    }
  }, [router]);

  useEffect(() => {
    if (!verificandoAdmin) {
      buscarDados();
    }
  }, [verificandoAdmin]);

  async function buscarDados() {
    try {
      const [resClientes, resRevendas] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`),
        fetch(`${process.env.NEXT_PUBLIC_URL_API}/revendas`)
      ]);

      const clientesData = await resClientes.json();
      const revendasData = await resRevendas.json();

      setClientes(clientesData);
      setRevendas(revendasData);
    } catch (err) {
      toast.error("Erro ao carregar dados.");
    } finally {
      setCarregando(false);
    }
  }

  async function excluirRevenda(id: string) {
    const confirmar = confirm("Deseja realmente excluir esta revenda?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/revendas/${id}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        toast.success("Revenda excluída!");
        setRevendas(prev => prev.filter(r => r.id !== id));
      } else {
        toast.error("Erro ao excluir.");
      }
    } catch (err) {
      toast.error("Erro ao processar exclusão.");
    }
  }

  if (verificandoAdmin || carregando) {
    return <div className="text-white text-center mt-10">Carregando...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-emerald-500 mb-6">Painel do Administrador</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-600 mb-6">
        <button
          onClick={() => setAbaAtiva("usuarios")}
          className={`px-4 py-2 font-medium ${
            abaAtiva === "usuarios" ? "border-b-2 border-emerald-500 text-emerald-500" : "text-white cursor-pointer"
          }`}
        >
          Usuários
        </button>
        <button
          onClick={() => setAbaAtiva("revendas")}
          className={`px-4 py-2 font-medium ${
            abaAtiva === "revendas" ? "border-b-2 border-emerald-500 text-emerald-500" : "text-white cursor-pointer"
          }`}
        >
          Revendas
        </button>
      </div>

      {/* Conteúdo da aba "Usuários" */}
      {abaAtiva === "usuarios" && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientes.map(cliente => (
            <div key={cliente.id} className="bg-zinc-800 p-4 rounded-lg text-white shadow">
              <p><strong>Nome:</strong> {cliente.nome}</p>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Telefone:</strong> {cliente.numeroTelefone}</p>
            </div>
          ))}
        </section>
      )}

      {/* Conteúdo da aba "Revendas" */}
      {abaAtiva === "revendas" && (
        <section className="grid grid-cols-1 gap-4">
          {revendas.map(revenda => (
            <div key={revenda.id} className="bg-zinc-900 p-4 rounded-lg text-white shadow flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={revenda.eventoImagem} alt="Evento" className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="text-lg font-bold">{revenda.descricaoEvento}</p>
                  <p><strong>Anunciante:</strong> {revenda.cliente?.nome}</p>
                  <p><strong>Status:</strong> {revenda.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p>R$ {revenda.precoRevenda.toFixed(2)} - {revenda.quantidade} ingresso(s)</p>
                <button
                  onClick={() => excluirRevenda(revenda.id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
