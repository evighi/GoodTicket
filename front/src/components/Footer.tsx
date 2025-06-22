"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react"; // use ícones modernos

export function Footer() {
    return (
        <footer className="w-full flex flex-col items-center bg-[#242428] text-white pt-10 pb-4 mt-10">
            <div className="w-[90%] max-w-5xl rounded-t-3xl bg-[#2E2E32] border border-gray-600 p-6 px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                {/* Logo e ano */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/goodticket.png" alt="Logo GoodTicket" width={120} height={40} />
                    </Link>
                    <p className="text-xs text-gray-400">
                        © 2025 GoodTicket d/ta. Todos direitos reservados.
                    </p>
                </div>

                {/* Links úteis */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-300">
                    <Link href="/acessibilidade" className="hover:text-green-400">Acessibilidade</Link>
                    <Link href="/suporte" className="hover:text-green-400">Suporte</Link>
                    <Link href="/sobre" className="hover:text-green-400">Sobre nós</Link>
                </div>

                {/* Ícones sociais */}
                <div className="flex gap-4">
                    <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-400">
                        <Instagram size={20} />
                    </Link>
                    <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-green-400">
                        <Facebook size={20} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-green-400">
                        <Twitter size={20} />
                    </Link>
                </div>

            </div>

            {/* Licenças e políticas */}
            <div className="text-xs text-gray-500 mt-2">
                <Link href="/licencas" className="hover:text-green-400 mx-1">Licenças</Link>|
                <Link href="/termos" className="hover:text-green-400 mx-1">Termos de uso</Link>|
                <Link href="/politicas" className="hover:text-green-400 mx-1">Políticas</Link>
            </div>
        </footer>
    );
}
