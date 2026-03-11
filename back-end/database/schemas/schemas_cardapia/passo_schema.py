class PassoReceitaBase(BaseModel):
    ordem: int
    descricao: str


class PassoReceitaCreate(PassoReceitaBase):
    pass


class PassoReceitaResponse(PassoReceitaBase):
    id: int

    class Config:
        from_attributes = True