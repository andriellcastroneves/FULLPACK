"use client";

import { useEffect, useState } from "react";

import { CaixaForm } from "@/components/catalog/caixa-form";
import { ProdutoForm } from "@/components/catalog/produto-form";
import { Header } from "@/components/header";
import { api } from "@/lib/api";
import type { CaixaCreate, CaixaResponse, ProdutoCreate, ProdutoResponse } from "@/types";

export default function CadastrosPage() {
  const [produtos, setProdutos] = useState<ProdutoResponse[]>([]);
  const [caixas, setCaixas] = useState<CaixaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProduto, setSavingProduto] = useState(false);
  const [savingCaixa, setSavingCaixa] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setLoading(true);
      try {
        const [produtosResponse, caixasResponse] = await Promise.all([
          api.listarProdutos(),
          api.listarCaixas(),
        ]);

        if (!ativo) {
          return;
        }

        setProdutos(produtosResponse);
        setCaixas(caixasResponse);
        setErro(null);
      } catch (error) {
        if (!ativo) {
          return;
        }

        setErro(error instanceof Error ? error.message : "Nao foi possivel carregar os cadastros.");
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    void carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const criarProduto = async (payload: ProdutoCreate) => {
    setSavingProduto(true);
    try {
      const novo = await api.criarProduto(payload);
      setProdutos((current) => [...current, novo].sort((a, b) => a.nome.localeCompare(b.nome)));
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao cadastrar produto.");
    } finally {
      setSavingProduto(false);
    }
  };

  const criarCaixa = async (payload: CaixaCreate) => {
    setSavingCaixa(true);
    try {
      const nova = await api.criarCaixa(payload);
      setCaixas((current) => [...current, nova].sort((a, b) => a.nome.localeCompare(b.nome)));
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao cadastrar caixa.");
    } finally {
      setSavingCaixa(false);
    }
  };

  return (
    <main className="flex-1 py-8 md:py-12">
      <div className="shell flex flex-col gap-8">
        <Header />
        <section className="panel px-6 py-8 md:px-10">
          <span className="chip">Cadastros</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Alimentacao do catalogo</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/72">
            Aqui voce cadastra as informacoes-base usadas no restante da operacao.
          </p>
          {erro ? <p className="mt-4 text-sm font-medium text-danger">{erro}</p> : null}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="panel p-6">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Produtos</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Novo produto</h2>
              <p className="mt-2 text-sm text-foreground/72">
                {loading ? "Sincronizando dados..." : `${produtos.length} produto(s) cadastrados.`}
              </p>
            </div>
            <ProdutoForm loading={savingProduto} onSubmit={criarProduto} />
          </div>

          <div className="panel p-6">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Caixas</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Nova caixa</h2>
              <p className="mt-2 text-sm text-foreground/72">
                {loading ? "Sincronizando dados..." : `${caixas.length} caixa(s) cadastradas.`}
              </p>
            </div>
            <CaixaForm loading={savingCaixa} onSubmit={criarCaixa} />
          </div>
        </section>
      </div>
    </main>
  );
}
