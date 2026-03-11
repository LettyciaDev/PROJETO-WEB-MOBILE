from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from config.config_db import Base

class Receita(Base):
    __tablename__ = "receitas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(200), nullable=False)
    tempo_preparo = Column(Integer)
    porcoes = Column(Integer)

    ingredientes = relationship("ReceitaIngrediente", back_populates="receita")
    passos = relationship("PassoReceita", back_populates="receita", order_by="PassoReceita.ordem")

class Ingrediente(Base):
    __tablename__ = "ingredientes"

    id = Column(Integer, primary_key=True)
    nome = Column(String(200), nullable=False)
    calorias_100g = Column(Float, nullable=False)

class ReceitaIngrediente(Base):
    __tablename__ = "receita_ingredientes"

    id = Column(Integer, primary_key=True)
    receita_id = Column(Integer, ForeignKey("receitas.id"))
    ingrediente_id = Column(Integer, ForeignKey("ingredientes.id"))

    quantidade_gramas = Column(Float) 

    
    receita = relationship("Receita", back_populates="ingredientes")
    ingrediente = relationship("Ingrediente")

class PassoReceita(Base):
    __tablename__ = "passos_receita"

    id = Column(Integer, primary_key=True)
    receita_id = Column(Integer, ForeignKey("receitas.id"))
    ordem = Column(Integer)
    descricao = Column(String)

    receita = relationship("Receita", back_populates="passos")

