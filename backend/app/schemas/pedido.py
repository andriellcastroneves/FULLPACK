from pydantic import BaseModel, Field
from typing import List, Optional


class PedidoItemInput(BaseModel):
    produto_id: int
    quantidade: int = Field(gt=0)


class PedidoInput(BaseModel):
    itens: List[PedidoItemInput]


class VolumeOutput(BaseModel):
    numero_volume: int
    quantidade: int
    peso_total: float
    embalagem_principal: Optional[str] = None
    observacao: Optional[str] = None


class ResultadoItemOutput(BaseModel):
    produto: str
    quantidade: int
    peso_unitario: float
    peso_total: float
    tipo_embalagem: str
    embalagem_principal: Optional[str] = None
    observacao: Optional[str] = None
    volumes: List[VolumeOutput]


class ResumoPedidoOutput(BaseModel):
    caixas: dict
    filme_preto: int
    plastico_bolha: dict
    outros: list


class PedidoOutput(BaseModel):
    itens: List[ResultadoItemOutput]
    resumo: ResumoPedidoOutput