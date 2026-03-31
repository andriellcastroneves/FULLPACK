from pydantic import BaseModel, Field


class CaixaBase(BaseModel):
    nome: str
    altura: float = Field(gt=0)
    largura: float = Field(gt=0)
    comprimento: float = Field(gt=0)


class CaixaCreate(CaixaBase):
    pass


class CaixaResponse(CaixaBase):
    id: int

    class Config:
        from_attributes = True