"use client";

import { FormEvent, useState } from "react";

import type { CaixaCreate } from "@/types";

type CaixaFormProps = {
  loading: boolean;
  onSubmit: (payload: CaixaCreate) => Promise<void> | void;
};

export function CaixaForm({ loading, onSubmit }: CaixaFormProps) {
  const [form, setForm] = useState<CaixaCreate>({
    nome: "",
    altura: 0,
    largura: 0,
    comprimento: 0,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
    setForm({
      nome: "",
      altura: 0,
      largura: 0,
      comprimento: 0,
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="caixa-nome">Nome</label>
        <input
          id="caixa-nome"
          className="field"
          required
          value={form.nome}
          onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="caixa-altura">Altura</label>
          <input
            id="caixa-altura"
            className="field"
            min={0.01}
            required
            step="0.01"
            type="number"
            value={form.altura || ""}
            onChange={(event) =>
              setForm((current) => ({ ...current, altura: Number(event.target.value) }))
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="caixa-largura">Largura</label>
          <input
            id="caixa-largura"
            className="field"
            min={0.01}
            required
            step="0.01"
            type="number"
            value={form.largura || ""}
            onChange={(event) =>
              setForm((current) => ({ ...current, largura: Number(event.target.value) }))
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="caixa-comprimento">Comprimento</label>
          <input
            id="caixa-comprimento"
            className="field"
            min={0.01}
            required
            step="0.01"
            type="number"
            value={form.comprimento || ""}
            onChange={(event) =>
              setForm((current) => ({ ...current, comprimento: Number(event.target.value) }))
            }
          />
        </div>
      </div>
      <button className="btn-primary" disabled={loading} type="submit">
        {loading ? "Salvando..." : "Cadastrar caixa"}
      </button>
    </form>
  );
}
