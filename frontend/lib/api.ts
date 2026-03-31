import type {
  CaixaCreate,
  CaixaResponse,
  HealthStatus,
  PedidoInput,
  PedidoOutput,
  ProdutoCreate,
  ProdutoResponse,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";

type RequestOptions = RequestInit & {
  path: string;
};

async function request<T>({ path, ...init }: RequestOptions): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Falha na comunicacao com a API.";

    try {
      const data = (await response.json()) as { detail?: string };
      if (data.detail) {
        message = data.detail;
      }
    } catch {
      message = `${message} Status ${response.status}.`;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  health() {
    return request<HealthStatus>({
      path: "/health",
      method: "GET",
    });
  },

  listarProdutos() {
    return request<ProdutoResponse[]>({
      path: "/produtos",
      method: "GET",
    });
  },

  criarProduto(payload: ProdutoCreate) {
    return request<ProdutoResponse>({
      path: "/produtos",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  editarProduto(id: number, payload: ProdutoCreate) {
    return request<ProdutoResponse>({
      path: `/produtos/${id}`,
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  excluirProduto(id: number) {
    return request<void>({
      path: `/produtos/${id}`,
      method: "DELETE",
    });
  },

  listarCaixas() {
    return request<CaixaResponse[]>({
      path: "/caixas",
      method: "GET",
    });
  },

  criarCaixa(payload: CaixaCreate) {
    return request<CaixaResponse>({
      path: "/caixas",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  editarCaixa(id: number, payload: CaixaCreate) {
    return request<CaixaResponse>({
      path: `/caixas/${id}`,
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  excluirCaixa(id: number) {
    return request<void>({
      path: `/caixas/${id}`,
      method: "DELETE",
    });
  },

  gerarPedidoEmbalagem(payload: PedidoInput) {
    return request<PedidoOutput>({
      path: "/pedidos/embalagem",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
