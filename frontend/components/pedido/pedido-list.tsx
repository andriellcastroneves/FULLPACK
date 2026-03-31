import type { PedidoDraftItem } from "@/types";

type PedidoListProps = {
  itens: PedidoDraftItem[];
  onRemoveItem: (indice: number) => void;
};

export function PedidoList({ itens, onRemoveItem }: PedidoListProps) {
  return (
    <section className="panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Itens do pedido
          </p>
          <h2 className="text-xl font-extrabold tracking-tight">Fila atual</h2>
        </div>
        <span className="chip">{itens.length} item(ns)</span>
      </div>

      {itens.length ? (
        <div className="space-y-3">
          {itens.map((item, index) => (
            <article
              key={`${item.produtoId}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-line bg-white/70 px-4 py-3"
            >
              <div>
                <p className="font-bold">
                  {item.produtoNome ?? `Produto #${item.produtoId}`}
                </p>
                <p className="text-sm text-foreground/72">
                  ID: {item.produtoId}
                  {item.tipoEmbalagem ? ` | Tipo: ${item.tipoEmbalagem}` : ""}
                </p>
                <p className="text-sm text-foreground/72">Quantidade: {item.quantidade}</p>
              </div>
              <button
                className="text-sm font-semibold text-danger"
                type="button"
                onClick={() => onRemoveItem(index)}
              >
                Remover
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-7 text-foreground/72">
          Nenhum item adicionado ainda.
        </p>
      )}
    </section>
  );
}
