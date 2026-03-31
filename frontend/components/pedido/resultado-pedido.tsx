import { ResumoPedido } from "@/components/pedido/resumo-pedido";
import type { PedidoOutput } from "@/types";

type ResultadoPedidoProps = {
  resultado: PedidoOutput | null;
};

export function ResultadoPedido({ resultado }: ResultadoPedidoProps) {
  if (!resultado) {
    return (
      <section className="panel flex min-h-[420px] items-center justify-center p-8">
        <div className="max-w-md text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Resultado
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">
            Aguardando geracao do pedido
          </h2>
          <p className="mt-3 text-sm leading-7 text-foreground/72">
            Assim que voce enviar os itens, a API retorna os volumes, observacoes
            e o resumo consolidado das embalagens.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="panel p-6">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Instrucao gerada
          </p>
          <h2 className="text-2xl font-black tracking-tight">Detalhamento por item</h2>
        </div>

        <div className="space-y-4">
          {resultado.itens.map((item) => (
            <article key={`${item.produto}-${item.quantidade}`} className="rounded-3xl border border-line bg-white/75 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-extrabold">{item.produto}</h3>
                  <p className="mt-1 text-sm text-foreground/72">
                    Tipo: {item.tipo_embalagem} | Quantidade: {item.quantidade}
                  </p>
                  <p className="mt-1 text-sm text-foreground/72">
                    Peso unitario: {item.peso_unitario} kg | Peso total: {item.peso_total} kg
                  </p>
                  {item.embalagem_principal ? (
                    <p className="mt-3 text-sm font-semibold text-accent-strong">
                      Embalagem principal: {item.embalagem_principal}
                    </p>
                  ) : null}
                  {item.observacao ? (
                    <p className="mt-2 text-sm leading-6 text-foreground/72">
                      {item.observacao}
                    </p>
                  ) : null}
                </div>
                <span className="chip">{item.volumes.length} volume(ns)</span>
              </div>

              <div className="mt-5 grid gap-3">
                {item.volumes.map((volume) => (
                  <div
                    key={`${item.produto}-${volume.numero_volume}`}
                    className="rounded-2xl border border-line bg-surface px-4 py-3"
                  >
                    <p className="font-bold">Volume {volume.numero_volume}</p>
                    <p className="mt-1 text-sm text-foreground/72">
                      Quantidade: {volume.quantidade} | Peso: {volume.peso_total} kg
                    </p>
                    {volume.embalagem_principal ? (
                      <p className="mt-2 text-sm font-semibold text-accent-strong">
                        {volume.embalagem_principal}
                      </p>
                    ) : null}
                    {volume.observacao ? (
                      <p className="mt-1 text-sm leading-6 text-foreground/72">
                        {volume.observacao}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <ResumoPedido resumo={resultado.resumo} />
    </section>
  );
}
