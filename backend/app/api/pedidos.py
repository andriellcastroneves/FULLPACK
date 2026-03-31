from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Produto, Caixa
from app.schemas.pedido import PedidoInput, PedidoOutput
from app.services.embalagem import (
    gerar_instrucao_embalagem,
    ajustar_tampas_no_pedido,
    consolidar_embalagem,
)

router = APIRouter(prefix="/pedidos", tags=["Pedidos"])


@router.post("/embalagem", response_model=PedidoOutput)
def gerar_pedido_embalagem(payload: PedidoInput, db: Session = Depends(get_db)):
    caixas = db.query(Caixa).all()
    resultados = []

    for item in payload.itens:
        produto = db.query(Produto).filter(Produto.id == item.produto_id).first()
        if not produto:
            raise HTTPException(status_code=404, detail=f"Produto {item.produto_id} não encontrado")

        instrucao = gerar_instrucao_embalagem(
            produto=produto,
            quantidade=item.quantidade,
            caixas=caixas,
        )
        resultados.append(instrucao)

    resultados = ajustar_tampas_no_pedido(resultados)
    resumo = consolidar_embalagem(resultados)

    return {
        "itens": resultados,
        "resumo": resumo,
    }