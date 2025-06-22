export interface RevendaItf {
  id: string;
  cliente: {
    nome: string;
  };
  descricaoEvento: string;
  eventoLocal: string;
  eventoImagem: string;
  quantidade: number;
  precoOriginal: number;
  precoRevenda: number;
  numeroTelefone: string;
  status: string;
  dataVenda?: string;
  dataAnuncio: string;
}
