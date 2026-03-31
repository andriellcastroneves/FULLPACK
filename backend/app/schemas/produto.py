from pydantic import BaseModel, Field


class ProdutoBase(BaseModel):
    nome: str
    altura: float = Field(gt=0)
    largura: float = Field(gt=0)
    comprimento: float = Field(gt=0)
    tipo_embalagem: str
    peso_unitario: float = Field(gt=0)


class ProdutoCreate(ProdutoBase):
    pass


class ProdutoResponse(ProdutoBase):
    id: int

    class Config:
        from_attributes = True