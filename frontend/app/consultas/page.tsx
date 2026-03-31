"use client";

import { useDeferredValue, useEffect, useState } from "react";

import { CaixaList } from "@/components/catalog/caixa-list";
import { ProdutoList } from "@/components/catalog/produto-list";
import { Header } from "@/components/header";
import { api } from "@/lib/api";
import type { CaixaCreate, CaixaResponse, ProdutoCreate, ProdutoResponse } from "@/types";

export default function ConsultasPage() {
  const [abaAtiva, setAbaAtiva] = useState<"produtos" | "caixas">("produtos");
  const [produtos, setProdutos] = useState<ProdutoResponse[]>([]);
  const [caixas, setCaixas] = useState<CaixaResponse[]>([]);
  const [buscaProdutos, setBuscaProdutos] = useState("");
  const [buscaCaixas, setBuscaCaixas] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const buscaProdutosSuavizada = useDeferredValue(buscaProdutos);
  const buscaCaixasSuavizada = useDeferredValue(buscaCaixas);

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

        setErro(error instanceof Error ? error.message : "Nao foi possivel carregar as consultas.");
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

  const atualizarProduto = async (id: number, payload: ProdutoCreate) => {
    const atualizado = await api.editarProduto(id, payload);
    setProdutos((current) =>
      current.map((produto) => (produto.id === id ? atualizado : produto)).sort((a, b) => a.nome.localeCompare(b.nome)),
    );
  };

  const excluirProduto = async (id: number) => {
    await api.excluirProduto(id);
    setProdutos((current) => current.filter((produto) => produto.id !== id));
  };

  const atualizarCaixa = async (id: number, payload: CaixaCreate) => {
    const atualizada = await api.editarCaixa(id, payload);
    setCaixas((current) =>
      current.map((caixa) => (caixa.id === id ? atualizada : caixa)).sort((a, b) => a.nome.localeCompare(b.nome)),
    );
  };

  const excluirCaixa = async (id: number) => {
    await api.excluirCaixa(id);
    setCaixas((current) => current.filter((caixa) => caixa.id !== id));
  };

  const termoProduto = buscaProdutosSuavizada.trim().toLowerCase();
  const termoCaixa = buscaCaixasSuavizada.trim().toLowerCase();

  const produtosFiltrados = termoProduto
    ? produtos.filter((produto) => {
        const conteudo = [
          produto.id,
          produto.nome,
          produto.tipo_embalagem,
          produto.altura,
          produto.largura,
          produto.comprimento,
          produto.peso_unitario,
        ]
          .join(" ")
          .toLowerCase();

        return conteudo.includes(termoProduto);
      })
    : [];

  const caixasFiltradas = termoCaixa
    ? caixas.filter((caixa) => {
        const conteudo = [caixa.id, caixa.nome, caixa.altura, caixa.largura, caixa.comprimento]
          .join(" ")
          .toLowerCase();

        return conteudo.includes(termoCaixa);
      })
    : [];

  return (
    <main className="flex-1 py-8 md:py-12">
      <div className="shell flex flex-col gap-8">
        <Header />
        <section className="panel px-6 py-8 md:px-10">
          <span className="chip">Consultas</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Conferencia do catalogo</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/72">
            Um espaco para verificar rapidamente produtos e caixas ja cadastrados.
          </p>
          {erro ? <p className="mt-4 text-sm font-medium text-danger">{erro}</p> : null}
        </section>

        {loading ? (
          <section className="panel flex min-h-[240px] items-center justify-center p-6">
            <p className="text-sm text-foreground/72">Carregando informacoes...</p>
          </section>
        ) : (
          <section className="consulta-shell">
            <div className="consulta-toolbar panel px-5 py-4 md:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                  Navegacao de consulta
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  Explore um catalogo por vez
                </h2>
              </div>
              <div className="switcher">
                <button
                  className={`switcher__item ${
                    abaAtiva === "produtos" ? "switcher__item--active" : ""
                  }`}
                  type="button"
                  onClick={() => setAbaAtiva("produtos")}
                >
                  Produtos
                </button>
                <button
                  className={`switcher__item ${
                    abaAtiva === "caixas" ? "switcher__item--active" : ""
                  }`}
                  type="button"
                  onClick={() => setAbaAtiva("caixas")}
                >
                  Caixas
                </button>
              </div>
            </div>

            <div className="consulta-stage">
              {abaAtiva === "produtos" ? (
                <div className="space-y-4">
                  <section className="panel p-5 md:p-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold" htmlFor="busca-produtos">
                        Filtrar produtos
                      </label>
                      <input
                        id="busca-produtos"
                        className="field"
                        placeholder="Busque por nome, ID, tipo ou dimensoes"
                        value={buscaProdutos}
                        onChange={(event) => setBuscaProdutos(event.target.value)}
                      />
                      <p className="text-sm text-foreground/72">
                        {termoProduto
                          ? `${produtosFiltrados.length} produto(s) encontrado(s).`
                          : "Digite um termo para exibir apenas os produtos desejados."}
                      </p>
                    </div>
                  </section>

                  {termoProduto ? (
                    <ProdutoList
                      produtos={produtosFiltrados}
                      onDelete={excluirProduto}
                      onUpdate={atualizarProduto}
                    />
                  ) : (
                    <section className="panel flex min-h-[280px] items-center justify-center p-6">
                      <p className="max-w-md text-center text-sm leading-7 text-foreground/72">
                        A listagem fica escondida ate voce iniciar a busca, deixando a tela mais leve e focada.
                      </p>
                    </section>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <section className="panel p-5 md:p-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold" htmlFor="busca-caixas">
                        Filtrar caixas
                      </label>
                      <input
                        id="busca-caixas"
                        className="field"
                        placeholder="Busque por nome, ID ou dimensoes"
                        value={buscaCaixas}
                        onChange={(event) => setBuscaCaixas(event.target.value)}
                      />
                      <p className="text-sm text-foreground/72">
                        {termoCaixa
                          ? `${caixasFiltradas.length} caixa(s) encontrada(s).`
                          : "Digite um termo para exibir apenas as caixas desejadas."}
                      </p>
                    </div>
                  </section>

                  {termoCaixa ? (
                    <CaixaList
                      caixas={caixasFiltradas}
                      onDelete={excluirCaixa}
                      onUpdate={atualizarCaixa}
                    />
                  ) : (
                    <section className="panel flex min-h-[280px] items-center justify-center p-6">
                      <p className="max-w-md text-center text-sm leading-7 text-foreground/72">
                        A lista aparece sob demanda, o que reduz o lag visual quando o catalogo cresce.
                      </p>
                    </section>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
