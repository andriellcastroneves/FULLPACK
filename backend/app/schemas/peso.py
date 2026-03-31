from pydantic import BaseModel, Field


class CalculoPesoInput(BaseModel):
    item: str
    quantidade_amostra: int = Field(gt=0)
    peso_amostra: float = Field(gt=0)
    peso_total: float = Field(gt=0)


class CalculoPesoOutput(BaseModel):
    item: str
    peso_unitario: float
    quantidade_estimada: float
    quantidade_arredondada: int