import type { ResumoPedidoOutput } from "@/types";

type ResumoPedidoProps = {
  resumo: ResumoPedidoOutput;
};

export function ResumoPedido({ resumo }: ResumoPedidoProps) {
  const caixas = Object.entries(resumo.caixas);
  const bolhas = Object.entries(resumo.plastico_bolha);

  return (
    <section className="panel p-6">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
          Consolidado
        </p>
        <h2 className="text-2xl font-black tracking-tight">Resumo de materiais</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-line bg-white/75 p-5">
          <h3 className="font-extrabold">Caixas</h3>
          {caixas.length ? (
            <ul className="mt-3 space-y-2 text-sm text-foreground/72">
              {caixas.map(([nome, quantidade]) => (
                <li key={nome}>
                  {nome}: {quantidade}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-foreground/72">Nenhuma caixa consolidada.</p>
          )}
        </article>

        <article className="rounded-3xl border border-line bg-white/75 p-5">
          <h3 className="font-extrabold">Plasticos bolha</h3>
          {bolhas.length ? (
            <ul className="mt-3 space-y-2 text-sm text-foreground/72">
              {bolhas.map(([nome, quantidade]) => (
                <li key={nome}>
                  {nome}: {quantidade}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-foreground/72">Nenhum plastico bolha no resumo.</p>
          )}
        </article>

        <article className="rounded-3xl border border-line bg-white/75 p-5">
          <h3 className="font-extrabold">Outros</h3>
          <p className="mt-3 text-sm text-foreground/72">
            Filme preto: {resumo.filme_preto}
          </p>
          {resumo.outros.length ? (
            <ul className="mt-3 space-y-2 text-sm text-foreground/72">
              {resumo.outros.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-foreground/72">Nenhum item extra listado.</p>
          )}
        </article>
      </div>
    </section>
  );
}
