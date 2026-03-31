import Link from "next/link";

import { Header } from "@/components/header";
import { SectionCard } from "@/components/home/section-card";

export default function Home() {
  return (
    <main className="flex-1 py-8 md:py-12">
      <div className="shell flex flex-col gap-8">
        <Header />
        <section className="panel scroll-section overflow-hidden">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-12">
            <div className="space-y-6">
              <span className="chip">Workspace de expedicao</span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
                  Um painel mais claro para cadastrar, consultar e montar pedidos sem ruido tecnico.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/74 md:text-lg">
                  A experiencia agora fica dividida por objetivo: alimentar o catalogo,
                  revisar informacoes e gerar pedidos de forma fluida.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className="btn-secondary text-center" href="/cadastros">
                  Abrir cadastros
                </Link>
                <Link className="btn-secondary text-center" href="/consultas">
                  Abrir consultas
                </Link>
                <Link className="btn-primary text-center" href="/pedido-embalagem">
                  Gerar pedido
                </Link>
              </div>
            </div>
            <div className="panel p-6 md:p-8">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
                    Visao geral
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    Tres portas de entrada para o mesmo fluxo.
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-line bg-white/50 px-4 py-4">
                    <p className="font-bold">Cadastros</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Produtos e caixas organizados em uma area unica de alimentacao.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line bg-white/50 px-4 py-4">
                    <p className="font-bold">Consultas</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Visualizacao limpa do catalogo para conferencias rapidas.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line bg-white/50 px-4 py-4">
                    <p className="font-bold">Geracao de pedidos</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Seleciona os itens e recebe o detalhamento da expedicao.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="floating-strip">
          <SectionCard
            eyebrow="Cadastros"
            title="Abasteca o catalogo"
            description="Cadastre produtos e caixas em um espaco dedicado, sem misturar formulario com consulta."
            href="/cadastros"
            cta="Ir para cadastros"
          />
          <SectionCard
            eyebrow="Consultas"
            title="Confira o que ja existe"
            description="Veja listas prontas para conferencia e valida o que esta disponivel antes de montar um pedido."
            href="/consultas"
            cta="Ir para consultas"
          />
          <SectionCard
            eyebrow="Pedidos"
            title="Monte a expedicao"
            description="Selecione os itens, ajuste quantidades e gere a instrucao consolidada de embalagem."
            href="/pedido-embalagem"
            cta="Ir para pedidos"
          />
        </section>
      </div>
    </main>
  );
}
