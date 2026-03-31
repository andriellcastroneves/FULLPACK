from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.db.models import Caixa
from app.db.session import get_db
from app.schemas.caixa import CaixaCreate, CaixaResponse

router = APIRouter(prefix="/caixas", tags=["Caixas"])


@router.get("", response_model=list[CaixaResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(Caixa).order_by(Caixa.nome.asc()).all()


@router.post("", response_model=CaixaResponse)
def criar(payload: CaixaCreate, db: Session = Depends(get_db)):
    existente = db.query(Caixa).filter(Caixa.nome.ilike(payload.nome)).first()
    if existente:
        raise HTTPException(status_code=400, detail="Caixa ja existe")

    caixa = Caixa(**payload.model_dump())
    db.add(caixa)
    db.commit()
    db.refresh(caixa)
    return caixa


@router.put("/{caixa_id}", response_model=CaixaResponse)
def editar(caixa_id: int, payload: CaixaCreate, db: Session = Depends(get_db)):
    caixa = db.query(Caixa).filter(Caixa.id == caixa_id).first()
    if not caixa:
        raise HTTPException(status_code=404, detail="Caixa nao encontrada")

    existente = (
        db.query(Caixa)
        .filter(Caixa.id != caixa_id, Caixa.nome.ilike(payload.nome))
        .first()
    )
    if existente:
        raise HTTPException(status_code=400, detail="Ja existe outra caixa com esse nome")

    for campo, valor in payload.model_dump().items():
        setattr(caixa, campo, valor)

    db.commit()
    db.refresh(caixa)
    return caixa


@router.delete("/{caixa_id}", status_code=status.HTTP_204_NO_CONTENT)
def excluir(caixa_id: int, db: Session = Depends(get_db)):
    caixa = db.query(Caixa).filter(Caixa.id == caixa_id).first()
    if not caixa:
        raise HTTPException(status_code=404, detail="Caixa nao encontrada")

    db.delete(caixa)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
