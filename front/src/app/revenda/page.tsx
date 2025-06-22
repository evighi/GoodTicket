"use client";

import RevendaIngresso from "@/components/RevendaIngresso";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function PaginaRevenda() {
    const router = useRouter();
    const [verificandoLogin, setVerificandoLogin] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const clienteId = localStorage.getItem("clienteKey");
            const token = localStorage.getItem("token");

            if (!clienteId || !token) {
                toast.error("Você precisa estar logado para cadastrar uma revenda.");
                router.push("/login");
            } else {
                setVerificandoLogin(false);
            }
        }
    }, [router]);

    if (verificandoLogin) {
        return null; // ou um loader simples, como: <div>Carregando...</div>
    }

    return (
        <main className="max-w-4xl mx-auto mt-10 p-4">
            <RevendaIngresso />
        </main>
    );
}
