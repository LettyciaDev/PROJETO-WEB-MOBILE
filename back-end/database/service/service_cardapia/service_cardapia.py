from sqlalchemy.orm import Session
from model.model_cardpia import model
from schemas.schemas_cardapia import (passo_schema, 
                                      receita_schema, 
                                      ingrediente_schema, 
                                      receita_ingred_sch)

def get_receita(db: Session, receita_id: int):
    return db.query(model.Receita).filter(model.Receita.id == receita_id).first()