// src/routes/symplaPython.ts
import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/eventos-python', async (req, res) => {
  try {
    const { search } = req.query;

    const response = await axios.get('http://localhost:8000/api/events', {
      params: {
        search_query: search
      }
    });

    res.json(response.data);
  } catch (error: any) {
    console.error('Erro ao buscar dados da API Python:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API Python' });
  }
});

export default router;
