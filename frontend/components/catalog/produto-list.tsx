"use client";

import { useState } from "react";

import type { ProdutoCreate, ProdutoResponse } from "@/types";

type ProdutoListProps = {
  produtos: ProdutoResponse[];
  onDelete?: (id: number) => Promise<void> | void;
  onUpdate?: (id: number, payload: ProdutoCreate) => Promise<void> | void;
};

export function ProdutoList({ produtos, onDelete, onUpdate }: ProdutoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<ProdutoCreate | null>(null);

  const iniciarEdicao = (produto: ProdutoResponse) => {
    setEditingId(produto.id);
    setDraft({
      nome: produto.nome,
      altura: produto.altura,
      largura: produto.largura,
      comprimento: produto.comprimento,
      tipo_embalagem: produto.tipo_embalagem,
      peso_unitario: produto.peso_unitario,
    });
  };

  return (
    <section className="panel p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Catalogo</p>
          <h2 className="text-2xl font-black tracking-tight">Produtos cadastrados</h2>
        </div>
        <span className="chip">{produtos.length} item(ns)</span>
      </div>
      <div className="list-shell">
        {produtos.map((produto) => (
          <article key={produto.id} className="list-item">
            {editingId === produto.id && draft ? (
              <div className="space-y-3">
                <input
                  className="field"
                  value={draft.nome}
                  onChange={(event) => setDraft((current) => current && { ...current, nome: event.target.value })}
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="field"
                    step="0.01"
                    type="number"
                    value={draft.altura}
                    onChange={(event) => setDraft((current) => current && { ...current, altura: Number(event.target.value) })}
                  />
                  <input
                    className="field"
                    step="0.01"
                    type="number"
                    value={draft.largura}
                    onChange={(event) => setDraft((current) => current && { ...current, largura: Number(event.target.value) })}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="field"
                    step="0.01"
                    type="number"
                    value={draft.comprimento}
                    onChange={(event) =>
                      setDraft((current) => current && { ...current, comprimento: Number(event.target.value) })
                    }
                  />
                  <input
                    className="field"
                    step="0.001"
                    type="number"
                    value={draft.peso_unitario}
                    onChange={(event) =>
                      setDraft((current) => current && { ...current, peso_unitario: Number(event.target.value) })
                    }
                  />
                </div>
                <input
                  className="field"
                  value={draft.tipo_embalagem}
                  onChange={(event) =>
                    setDraft((current) => current && { ...current, tipo_embalagem: event.target.value })
                  }
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={async () => {
                      if (onUpdate && draft) {
                        await onUpdate(produto.id, draft);
                      }
                      setEditingId(null);
                      setDraft(null);
                    }}
                  >
                    Salvar
                  </button>
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setDraft(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-extrabold">{produto.nome}</h3>
                    <p className="text-sm text-foreground/72">
                      ID: {produto.id} | Tipo: {produto.tipo_embalagem}
                    </p>
                  </div>
                  <span className="chip">{produto.peso_unitario} kg</span>
                </div>
                <p className="mt-2 text-sm text-foreground/72">
                  {produto.altura} x {produto.largura} x {produto.comprimento}
                </p>
                {(onUpdate || onDelete) ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {onUpdate ? (
                      <button className="btn-secondary" type="button" onClick={() => iniciarEdicao(produto)}>
                        Editar
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button className="btn-secondary text-danger" type="button" onClick={() => void onDelete(produto.id)}>
                        Excluir
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </article>
        ))}
        {!produtos.length ? (
          <p className="text-sm text-foreground/72">Nenhum produto cadastrado ainda.</p>
        ) : null}
      </div>
    </section>
  );
}
