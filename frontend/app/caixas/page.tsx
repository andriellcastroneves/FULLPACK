"use client";

import { useEffect, useState } from "react";

import { CaixaForm } from "@/components/catalog/caixa-form";
import { CaixaList } from "@/components/catalog/caixa-list";
import { Header } from "@/components/header";
import { api } from "@/lib/api";
import type { CaixaCreate, CaixaResponse } from "@/types";

export default function CaixasPage() {
  const [caixas, setCaixas] = useState<CaixaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregarCaixas = async () => {
    setLoading(true);
    try {
      const response = await api.listarCaixas();
      setCaixas(response);
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao carregar caixas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void carregarCaixas();
  }, []);

  const criarCaixa = async (payload: CaixaCreate) => {
    setSaving(true);
    try {
      const novaCaixa = await api.criarCaixa(payload);
      setCaixas((current) => [...current, novaCaixa].sort((a, b) => a.nome.localeCompare(b.nome)));
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao cadastrar caixa.");
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
              <span className="chip">Caixas</span>
              <h1 className="text-3xl font-black tracking-tight">Cadastro de caixas</h1>
              <p className="text-sm leading-7 text-foreground/72">
                Mantenha aqui as caixas disponiveis para o calculo de embalagem.
              </p>
            </div>
            <CaixaForm loading={saving} onSubmit={criarCaixa} />
            {erro ? <p className="mt-4 text-sm font-medium text-danger">{erro}</p> : null}
          </div>
          {loading ? (
            <section className="panel flex min-h-[240px] items-center justify-center p-6">
              <p className="text-sm text-foreground/72">Carregando caixas...</p>
            </section>
          ) : (
            <CaixaList caixas={caixas} />
          )}
        </section>
      </div>
    </main>
  );
}
