import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="panel px-5 py-4 md:px-7">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            FullPack
          </p>
          <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
            Central de expedicao
          </h2>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link className="chip" href="/">
              Inicio
            </Link>
            <Link className="chip" href="/cadastros">
              Cadastros
            </Link>
            <Link className="chip" href="/consultas">
              Consultas
            </Link>
            <Link className="chip" href="/pedido-embalagem">
              Geracao de pedidos
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
