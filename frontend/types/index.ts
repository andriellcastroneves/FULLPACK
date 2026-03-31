export type PedidoDraftItem = {
  produtoId: number;
  quantidade: number;
  produtoNome?: string;
  tipoEmbalagem?: string;
};

export type ProdutoResponse = {
  id: number;
  nome: string;
  altura: number;
  largura: number;
  comprimento: number;
  tipo_embalagem: string;
  peso_unitario: number;
};

export type ProdutoCreate = {
  nome: string;
  altura: number;
  largura: number;
  comprimento: number;
  tipo_embalagem: string;
  peso_unitario: number;
};

export type CaixaResponse = {
  id: number;
  nome: string;
  altura: number;
  largura: number;
  comprimento: number;
};

export type CaixaCreate = {
  nome: string;
  altura: number;
  largura: number;
  comprimento: number;
};

export type PedidoItemInput = {
  produto_id: number;
  quantidade: number;
};

export type PedidoInput = {
  itens: PedidoItemInput[];
};

export type VolumeOutput = {
  numero_volume: number;
  quantidade: number;
  peso_total: number;
  embalagem_principal: string | null;
  observacao: string | null;
};

export type ResultadoItemOutput = {
  produto: string;
  quantidade: number;
  peso_unitario: number;
  peso_total: number;
  tipo_embalagem: string;
  embalagem_principal: string | null;
  observacao: string | null;
  volumes: VolumeOutput[];
};

export type ResumoPedidoOutput = {
  caixas: Record<string, number>;
  filme_preto: number;
  plastico_bolha: Record<string, number>;
  outros: string[];
};

export type PedidoOutput = {
  itens: ResultadoItemOutput[];
  resumo: ResumoPedidoOutput;
};

export type HealthStatus = {
  status: string;
};
