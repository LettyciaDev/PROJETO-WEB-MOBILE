class ReceitaIngredienteBase(BaseModel):
    ingrediente_id: int
    quantidade_gramas: float


class ReceitaIngredienteCreate(ReceitaIngredienteBase):
    pass


class ReceitaIngredienteResponse(BaseModel):
    id: int
    quantidade_gramas: float
    ingrediente: IngredienteResponse

    class Config:
        from_attributes = True