from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
import httpx
import os
from datetime import datetime

router = APIRouter()

class Event(BaseModel):
    id: str
    name: str
    event_url: str
    image_url: Optional[str] = None
    city: Optional[str] = None
    start_date: Optional[str] = None

@router.get("/events", response_model=List[Event])
async def get_events(search_query: Optional[str] = Query(None, description="Termo de busca para eventos")):
    """
    Busca eventos na API pública da Sympla.
    """
    try:
        async with httpx.AsyncClient() as client:
            url = "https://www.sympla.com.br/api/discovery-bff/search"
            params = {}
            if search_query:
                params["title"] = search_query

            response = await client.get(url, params=params)
            
            if not response.is_success:
                raise HTTPException(
                    status_code=502,
                    detail=f"Erro ao comunicar com a API da Sympla. A Sympla respondeu com o status: {response.status_code} e a mensagem: {response.text}"
                )

            data = response.json()
            
            events = []
            for item in data:
                mapped_event = {
                    "id": str(item.get("id")),
                    "name": item.get("name"),
                    "event_url": item.get("url"),
                    "image_url": item.get("images", {}).get("original"),
                    "city": item.get("location", {}).get("city"),
                    "start_date": item.get("start_date_formats", {}).get("pt")
                }
                events.append(mapped_event)

            return events

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Erro ao conectar com a API da Sympla: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno do servidor: {str(e)}"
        ) 