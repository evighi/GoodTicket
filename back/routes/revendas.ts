import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Criar revenda
router.post("/", async (req, res) => {
    try {
        const {
            clienteId,
            eventoId,
            eventoImagem,
            eventoUrl,
            descricaoEvento,
            eventoLocal,
            quantidade,
            precoOriginal,
            precoRevenda,
            numeroTelefone,
            status,
            dataVenda, // opcional
        } = req.body;

        const revenda = await prisma.revenda.create({
            data: {
                clienteId,
                eventoId,
                eventoUrl,
                eventoImagem,
                descricaoEvento,
                eventoLocal,
                quantidade: Number(quantidade),
                precoOriginal: parseFloat(precoOriginal),
                precoRevenda: parseFloat(precoRevenda),
                numeroTelefone,
                status,
                dataVenda: dataVenda ? new Date(dataVenda) : null,
            },
        });

        res.status(201).json(revenda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar revenda" });
    }
});

// Listar revendas
router.get("/", async (_req, res) => {
    try {
        const revendas = await prisma.revenda.findMany({
            orderBy: { dataAnuncio: "desc" },
            include: {
                cliente: true,
            },
        });

        res.json(revendas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar as revendas." });
    }
});

// Atualizar revenda
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            eventoId,
            eventoImagem,
            eventoUrl,
            eventoLocal,
            quantidade,
            precoOriginal,
            precoRevenda,
            numeroTelefone,
            status,
            dataVenda,
        } = req.body;

        const revendaAtualizada = await prisma.revenda.update({
            where: { id },
            data: {
                eventoId,
                eventoImagem,
                eventoUrl,
                eventoLocal,
                quantidade: Number(quantidade),
                precoOriginal: parseFloat(precoOriginal),
                precoRevenda: parseFloat(precoRevenda),
                numeroTelefone,
                status,
                dataVenda: dataVenda ? new Date(dataVenda) : null,
            },
        });

        res.json(revendaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar revenda." });
    }
});

// Excluir revenda
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.revenda.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir revenda." });
    }
});

export default router;
