from sqlalchemy import Column, Integer, String, Float, DateTime, func
from app.db.session import Base


class Caixa(Base):
    __tablename__ = "caixas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, nullable=False)
    altura = Column(Float, nullable=False)
    largura = Column(Float, nullable=False)
    comprimento = Column(Float, nullable=False)


class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, nullable=False)
    altura = Column(Float, nullable=False)
    largura = Column(Float, nullable=False)
    comprimento = Column(Float, nullable=False)
    tipo_embalagem = Column(String, nullable=False, default="caixa")
    peso_unitario = Column(Float, nullable=False, default=0.01)
    criado_em = Column(DateTime, nullable=False, server_default=func.now())