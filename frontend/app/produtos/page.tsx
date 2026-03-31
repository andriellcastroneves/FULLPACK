"use client";

import { useEffect, useState } from "react";

import { ProdutoForm } from "@/components/catalog/produto-form";
import { ProdutoList } from "@/components/catalog/produto-list";
import { Header } from "@/components/header";
import { api } from "@/lib/api";
import type { ProdutoCreate, ProdutoResponse } from "@/types";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<ProdutoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const response = await api.listarProdutos();
      setProdutos(response);
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void carregarProdutos();
  }, []);

  const criarProduto = async (payload: ProdutoCreate) => {
    setSaving(true);
    try {
      const novoProduto = await api.criarProduto(payload);
      setProdutos((current) => [...current, novoProduto].sort((a, b) => a.nome.localeCompare(b.nome)));
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao cadastrar produto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 py-8 md:py-12">
      <div className="shell flex flex-col gap-8">
        <Header />
        <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="panel p-6">
            <div className="mb-5 space-y-2">
              <span className="chip">Produtos</span>
              <h1 className="text-3xl font-black tracking-tight">Cadastro de produtos</h1>
              <p className="text-sm leading-7 text-foreground/72">
                Cadastre aqui os produtos usados no pedido de embalagem.
              </p>
            </div>
            <ProdutoForm loading={saving} onSubmit={criarProduto} />
            {erro ? <p className="mt-4 text-sm font-medium text-danger">{erro}</p> : null}
          </div>
          {loading ? (
            <section className="panel flex min-h-[240px] items-center justify-center p-6">
              <p className="text-sm text-foreground/72">Carregando produtos...</p>
            </section>
          ) : (
            <ProdutoList produtos={produtos} />
          )}
        </section>
      </div>
    </main>
  );
}
