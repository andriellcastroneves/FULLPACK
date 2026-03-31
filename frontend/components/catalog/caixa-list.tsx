"use client";

import { useState } from "react";

import type { CaixaCreate, CaixaResponse } from "@/types";

type CaixaListProps = {
  caixas: CaixaResponse[];
  onDelete?: (id: number) => Promise<void> | void;
  onUpdate?: (id: number, payload: CaixaCreate) => Promise<void> | void;
};

export function CaixaList({ caixas, onDelete, onUpdate }: CaixaListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<CaixaCreate | null>(null);

  const iniciarEdicao = (caixa: CaixaResponse) => {
    setEditingId(caixa.id);
    setDraft({
      nome: caixa.nome,
      altura: caixa.altura,
      largura: caixa.largura,
      comprimento: caixa.comprimento,
    });
  };

  return (
    <section className="panel p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Catalogo</p>
          <h2 className="text-2xl font-black tracking-tight">Caixas cadastradas</h2>
        </div>
        <span className="chip">{caixas.length} item(ns)</span>
      </div>
      <div className="list-shell">
        {caixas.map((caixa) => (
          <article key={caixa.id} className="list-item">
            {editingId === caixa.id && draft ? (
              <div className="space-y-3">
                <input
                  className="field"
                  value={draft.nome}
                  onChange={(event) => setDraft((current) => current && { ...current, nome: event.target.value })}
                />
                <div className="grid gap-3 md:grid-cols-3">
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
                  <input
                    className="field"
                    step="0.01"
                    type="number"
                    value={draft.comprimento}
                    onChange={(event) =>
                      setDraft((current) => current && { ...current, comprimento: Number(event.target.value) })
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={async () => {
                      if (onUpdate && draft) {
                        await onUpdate(caixa.id, draft);
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
                <h3 className="font-extrabold">{caixa.nome}</h3>
                <p className="mt-1 text-sm text-foreground/72">ID: {caixa.id}</p>
                <p className="mt-2 text-sm text-foreground/72">
                  {caixa.altura} x {caixa.largura} x {caixa.comprimento}
                </p>
                {(onUpdate || onDelete) ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {onUpdate ? (
                      <button className="btn-secondary" type="button" onClick={() => iniciarEdicao(caixa)}>
                        Editar
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button className="btn-secondary text-danger" type="button" onClick={() => void onDelete(caixa.id)}>
                        Excluir
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </article>
        ))}
        {!caixas.length ? (
          <p className="text-sm text-foreground/72">Nenhuma caixa cadastrada ainda.</p>
        ) : null}
      </div>
    </section>
  );
}
