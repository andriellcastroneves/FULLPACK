"use client";

import { FormEvent, useState } from "react";

import type { PedidoDraftItem, ProdutoResponse } from "@/types";

type AddItemFormProps = {
  produtos: ProdutoResponse[];
  loadingProdutos: boolean;
  onAddItem: (item: PedidoDraftItem) => void;
};

export function AddItemForm({
  produtos,
  loadingProdutos,
  onAddItem,
}: AddItemFormProps) {
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const produtoIdNumber = Number(produtoId);
    const quantidadeNumber = Number(quantidade);

    if (!Number.isInteger(produtoIdNumber) || produtoIdNumber <= 0) {
      return;
    }

    if (!Number.isInteger(quantidadeNumber) || quantidadeNumber <= 0) {
      return;
    }

    const produto = produtos.find((current) => current.id === produtoIdNumber);

    onAddItem({
      produtoId: produtoIdNumber,
      quantidade: quantidadeNumber,
      produtoNome: produto?.nome,
      tipoEmbalagem: produto?.tipo_embalagem,
    });

    setProdutoId("");
    setQuantidade("");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="produtoId">
          Produto
        </label>
        <select
          id="produtoId"
          className="field"
          disabled={loadingProdutos || produtos.length === 0}
          value={produtoId}
          onChange={(event) => setProdutoId(event.target.value)}
        >
          <option value="">
            {loadingProdutos ? "Carregando produtos..." : "Selecione um produto"}
          </option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              #{produto.id} - {produto.nome} ({produto.tipo_embalagem})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor="quantidade">
          Quantidade
        </label>
        <input
          id="quantidade"
          className="field"
          inputMode="numeric"
          min={1}
          placeholder="Ex.: 10"
          type="number"
          value={quantidade}
          onChange={(event) => setQuantidade(event.target.value)}
        />
      </div>

      <button
        className="btn-secondary w-full"
        disabled={!produtoId || loadingProdutos || produtos.length === 0}
        type="submit"
      >
        Adicionar item
      </button>
    </form>
  );
}
