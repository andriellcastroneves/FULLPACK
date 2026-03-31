"use client";

import { FormEvent, useState } from "react";

import type { ProdutoCreate } from "@/types";

type ProdutoFormProps = {
  loading: boolean;
  onSubmit: (payload: ProdutoCreate) => Promise<void> | void;
};

const TIPOS_EMBALAGEM = [
  "caixa",
  "blister",
  "saco_feno_palha",
  "rolo_bolha",
  "rolo_cartonado",
  "tampa",
  "caixa_desmontada",
];

export function ProdutoForm({ loading, onSubmit }: ProdutoFormProps) {
  const [form, setForm] = useState<ProdutoCreate>({
    nome: "",
    altura: 0,
    largura: 0,
    comprimento: 0,
    tipo_embalagem: "caixa",
    peso_unitario: 0,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
    setForm({
      nome: "",
      altura: 0,
      largura: 0,
      comprimento: 0,
      tipo_embalagem: "caixa",
      peso_unitario: 0,
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="produto-nome">Nome</label>
        <input
          id="produto-nome"
          className="field"
          required
          value={form.nome}
          onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="produto-altura">Altura</label>
          <input
            id="produto-altura"
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
          <label className="text-sm font-semibold" htmlFor="produto-largura">Largura</label>
          <input
            id="produto-largura"
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
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="produto-comprimento">Comprimento</label>
          <input
            id="produto-comprimento"
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
        <div className="space-y-2">
          <label className="text-sm font-semibold" htmlFor="produto-peso">Peso unitario</label>
          <input
            id="produto-peso"
            className="field"
            min={0.001}
            required
            step="0.001"
            type="number"
            value={form.peso_unitario || ""}
            onChange={(event) =>
              setForm((current) => ({ ...current, peso_unitario: Number(event.target.value) }))
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="produto-tipo">Tipo de embalagem</label>
        <select
          id="produto-tipo"
          className="field"
          value={form.tipo_embalagem}
          onChange={(event) =>
            setForm((current) => ({ ...current, tipo_embalagem: event.target.value }))
          }
        >
          {TIPOS_EMBALAGEM.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
      <button className="btn-primary" disabled={loading} type="submit">
        {loading ? "Salvando..." : "Cadastrar produto"}
      </button>
    </form>
  );
}
