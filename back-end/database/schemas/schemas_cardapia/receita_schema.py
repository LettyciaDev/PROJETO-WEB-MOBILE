from pydantic import BaseModel
from typing import List
from .receita_ingred_sch import ReceitaIngredienteCreate, ReceitaIngredienteResponse
from .passo_schema import PassoReceitaCreate, PassoReceitaResponse

class ReceitaBase(BaseModel):
    nome : str
    tempo_preparo: int | None = None
    porcoes: int | None = None

class ReceitaCreate(ReceitaBase):
    ingredientes: List[ReceitaIngredienteCreate]
    passos: List[PassoReceitaCreate]

class ReceitaResponse(ReceitaBase):
    id: int
    ingredientes: List[ReceitaIngredienteResponse]
    passos: List[PassoReceitaResponse]

    class Config:
        from_attributes = True
   