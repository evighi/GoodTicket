"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { EventoItf } from "@/utils/types/EventoItf";
import { useClienteStore } from "@/context/ClienteContext";
import { useEventosStore } from "@/context/EventosStore";
import { InputPesquisa } from "@/components/InputPesquisa";
import { toast } from "sonner";
import { Search, User } from "lucide-react";

export function Header() {
    const { cliente, deslogaCliente } = useClienteStore();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [showInput, setShowInput] = useState(false);
    const { setEventos } = useEventosStore(); // ou tipado se quiser

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        deslogaCliente();
        localStorage.removeItem("clienteId");
        localStorage.removeItem("token");
        toast.success("Logout realizado com sucesso!");
        setOpen(false);
        window.location.href = "/";
    };

    return (
        <nav className="w-full flex justify-center py-3 bg-[#242428]">
            <div className="w-[90%] max-w-5xl flex items-center justify-between px-6 py-2 rounded-full border border-gray-600 bg-[#2E2E32]">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/goodticket.png" alt="Logo GoodTicket" width={100} height={100} />
                </Link>

                {/* Links de navegação */}
                <div className="flex items-center gap-6 text-white text-sm font-medium">
                    <Link href="/" className="hover:text-green-400">Revendas</Link>
                    <Link href="/" className="hover:text-green-400">Eventos</Link>
                    <Link href="/revenda" className="hover:text-green-400">Venda Seu Ingresso</Link>
                </div>

                {/* Ícones e Menu do usuário */}
                <div className="flex items-center gap-4 relative" ref={menuRef}>
                    {/* Ícone de busca */}
                    <button onClick={() => setShowInput(!showInput)} aria-label="Pesquisar">
                        <Search size={20} className="text-white cursor-pointer" />
                    </button>

                    {/* Campo de pesquisa opcional */}
                    {showInput && (
                        <div className="absolute top-12 right-0 z-40 w-[500px] max-w-[90vw] px-4">
                            <InputPesquisa onSearchComplete={() => setShowInput(false)} />
                        </div>
                    )}

                    {/* Ícone do usuário */}
                    <button onClick={() => setOpen(!open)} aria-label="Menu do usuário">
                        <User size={22} className="text-green-400 cursor-pointer" />
                    </button>

                    {/* Menu suspenso */}
                    {open && (
                        <div className="absolute right-0 top-12 w-44 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50">
                            {!cliente ? (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href="/cadastro"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Cadastrar-se
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/conta"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    >
                                        Minha conta
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    >
                                        Sair
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
