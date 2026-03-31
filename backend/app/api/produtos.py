from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.db.models import Produto
from app.db.session import get_db
from app.schemas.produto import ProdutoCreate, ProdutoResponse

router = APIRouter(prefix="/produtos", tags=["Produtos"])


@router.get("", response_model=list[ProdutoResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(Produto).order_by(Produto.nome.asc()).all()


@router.post("", response_model=ProdutoResponse)
def criar(payload: ProdutoCreate, db: Session = Depends(get_db)):
    existente = db.query(Produto).filter(Produto.nome.ilike(payload.nome)).first()
    if existente:
        raise HTTPException(status_code=400, detail="Produto ja existe")

    produto = Produto(**payload.model_dump())
    db.add(produto)
    db.commit()
    db.refresh(produto)
    return produto


@router.put("/{produto_id}", response_model=ProdutoResponse)
def editar(produto_id: int, payload: ProdutoCreate, db: Session = Depends(get_db)):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto nao encontrado")

    existente = (
        db.query(Produto)
        .filter(Produto.id != produto_id, Produto.nome.ilike(payload.nome))
        .first()
    )
    if existente:
        raise HTTPException(status_code=400, detail="Ja existe outro produto com esse nome")

    for campo, valor in payload.model_dump().items():
        setattr(produto, campo, valor)

    db.commit()
    db.refresh(produto)
    return produto


@router.delete("/{produto_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto nao encontrado")

    db.delete(produto)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
