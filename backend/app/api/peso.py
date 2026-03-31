from fastapi import APIRouter
from app.schemas.peso import CalculoPesoInput, CalculoPesoOutput
from app.services.peso import calcular_quantidade_por_peso

router = APIRouter(prefix="/peso", tags=["Peso"])


@router.post("/calcular", response_model=CalculoPesoOutput)
def calcular(payload: CalculoPesoInput):
    return calcular_quantidade_por_peso(
        item=payload.item,
        quantidade_amostra=payload.quantidade_amostra,
        peso_amostra=payload.peso_amostra,
        peso_total=payload.peso_total,
    )