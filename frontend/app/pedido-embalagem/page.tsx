"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/header";
import { AddItemForm } from "@/components/pedido/add-item-form";
import { PedidoList } from "@/components/pedido/pedido-list";
import { ResultadoPedido } from "@/components/pedido/resultado-pedido";
import { api } from "@/lib/api";
import type { PedidoDraftItem, PedidoOutput, ProdutoResponse } from "@/types";

export default function PedidoEmbalagemPage() {
  const [produtos, setProdutos] = useState<ProdutoResponse[]>([]);
  const [itens, setItens] = useState<PedidoDraftItem[]>([]);
  const [resultado, setResultado] = useState<PedidoOutput | null>(null);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ambiente, setAmbiente] = useState<"loading" | "ready" | "alert">("loading");

  useEffect(() => {
    let ativo = true;

    async function carregarDadosIniciais() {
      setLoadingProdutos(true);

      try {
        const [health, produtosResponse] = await Promise.all([
          api.health(),
          api.listarProdutos(),
        ]);

        if (!ativo) {
          return;
        }

        setAmbiente(health.status === "ok" ? "ready" : "alert");
        setProdutos(produtosResponse);
      } catch (error) {
        if (!ativo) {
          return;
        }

        setAmbiente("alert");
        setErro(
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar os dados iniciais da API.",
        );
      } finally {
        if (ativo) {
          setLoadingProdutos(false);
        }
      }
    }

    carregarDadosIniciais();

    return () => {
      ativo = false;
    };
  }, []);

  const adicionarItem = (item: PedidoDraftItem) => {
    setItens((current) => [...current, item]);
    setErro(null);
  };

  const removerItem = (indice: number) => {
    setItens((current) => current.filter((_, index) => index !== indice));
  };

  const gerarPedido = async () => {
    if (!itens.length) {
      setErro("Adicione ao menos um item antes de gerar o pedido.");
      return;
    }

    setLoading(true);
    setErro(null);

    try {
      const response = await api.gerarPedidoEmbalagem({
        itens: itens.map((item) => ({
          produto_id: item.produtoId,
          quantidade: item.quantidade,
        })),
      });

      setResultado(response);
    } catch (error) {
      setResultado(null);
      setErro(error instanceof Error ? error.message : "Nao foi possivel consultar a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 py-8 md:py-12">
      <div className="shell flex flex-col gap-8">
        <Header />
        <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="space-y-6">
            <div className="panel p-6">
              <div className="mb-5 space-y-2">
                <span className="chip">Pedido de embalagem</span>
                <h1 className="text-3xl font-black tracking-tight">Monte o pedido</h1>
                <p className="text-sm leading-7 text-foreground/72">
                  Selecione os produtos cadastrados no backend e monte o pedido
                  para gerar a instrucao de expedicao.
                </p>
                <p
                  className={`text-sm font-semibold ${
                    ambiente === "ready"
                      ? "text-accent-strong"
                      : ambiente === "alert"
                        ? "text-danger"
                        : "text-foreground/72"
                  }`}
                >
                  {ambiente === "loading"
                    ? "Preparando ambiente..."
                    : ambiente === "ready"
                      ? "Tudo pronto para montar o pedido."
                      : "Houve um problema ao carregar os dados iniciais."}
                </p>
              </div>
              <AddItemForm
                loadingProdutos={loadingProdutos}
                produtos={produtos}
                onAddItem={adicionarItem}
              />
              {!loadingProdutos && produtos.length === 0 ? (
                <p className="mt-4 text-sm text-warning">
                  Nenhum produto cadastrado no backend. Cadastre produtos antes de gerar pedidos.
                </p>
              ) : null}
            </div>

            <PedidoList itens={itens} onRemoveItem={removerItem} />

            <div className="panel p-6">
              <button className="btn-primary w-full" disabled={loading} onClick={gerarPedido}>
                {loading ? "Gerando instrucao..." : "Gerar embalagem"}
              </button>
              {erro ? <p className="mt-4 text-sm font-medium text-danger">{erro}</p> : null}
            </div>
          </div>

          <ResultadoPedido resultado={resultado} />
        </section>
      </div>
    </main>
  );
}
