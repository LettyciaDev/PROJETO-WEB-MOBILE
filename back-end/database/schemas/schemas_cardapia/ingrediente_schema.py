from pydantic import BaseModel

class IngredienteBase(BaseModel):
    nome: str
    calorias_100g: float


class IngredienteCreate(IngredienteBase):
    pass


class IngredienteResponse(IngredienteBase):
    id: int

    class Config:
        from_attributes = True