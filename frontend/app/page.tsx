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
              <span className="chip">Organizacao e controle de pedidos</span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
                  Tudo o que voce precisa para organizar produtos, conferir informacoes e preparar pedidos com mais agilidade.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/74 md:text-lg">
                  Reunimos as etapas mais importantes da operacao em um unico lugar, com uma navegacao simples e objetiva para o dia a dia.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className="btn-secondary text-center" href="/cadastros">
                  Cadastrar informacoes
                </Link>
                <Link className="btn-secondary text-center" href="/consultas">
                  Consultar catalogo
                </Link>
                <Link className="btn-primary text-center" href="/pedido-embalagem">
                  Montar pedido
                </Link>
              </div>
            </div>
            <div className="panel p-6 md:p-8">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
                    Como funciona
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    Tres areas pensadas para acompanhar a sua rotina.
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-line bg-white/50 px-4 py-4">
                    <p className="font-bold">Cadastros</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Registre produtos e caixas para manter a operacao sempre atualizada.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line bg-white/50 px-4 py-4">
                    <p className="font-bold">Consultas</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Encontre rapidamente o que voce precisa antes de seguir para a proxima etapa.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line bg-white/50 px-4 py-4">
                    <p className="font-bold">Geracao de pedidos</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Monte o pedido e visualize a orientacao de embalagem com clareza.
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
            title="Mantenha seu catalogo atualizado"
            description="Cadastre produtos e caixas em poucos passos para deixar a operacao pronta para atender novos pedidos."
            href="/cadastros"
            cta="Acessar cadastros"
          />
          <SectionCard
            eyebrow="Consultas"
            title="Consulte antes de decidir"
            description="Busque produtos e caixas com rapidez para conferir detalhes, revisar medidas e seguir com seguranca."
            href="/consultas"
            cta="Abrir consultas"
          />
          <SectionCard
            eyebrow="Pedidos"
            title="Prepare pedidos com mais rapidez"
            description="Selecione os itens, informe as quantidades e receba a orientacao de embalagem de forma organizada."
            href="/pedido-embalagem"
            cta="Criar pedido"
          />
        </section>
      </div>
    </main>
  );
}
