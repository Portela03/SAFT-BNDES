export interface Operacao {
  id: number
  bndesId: string
  cliente: string
  cnpj: string
  descricaoDoProjeto: string
  uf: string
  municipio: string
  municipioCodigo: string
  numeroDoContrato: string
  dataDaContratacao: string
  valorContratadoReais: number
  valorDesembolsadoReais: number
  fonteDeRecursoDesembolsos: string
  custoFinanceiro: string
  juros: number
  prazoCarenciaMeses: number
  prazoAmortizacaoMeses: number
  modalidadeDeApoio: string
  formaDeApoio: string
  produto: string
  instrumentoFinanceiro: string
  inovacao: string
  areaOperacional: string
  setorCnae: string
  subsetorCnaeAgrupado: string
  subsetorCnaeCodigo: string
  subsetorCnaeNome: string
  setorBndes: string
  subsetorBndes: string
  porteDoCliente: string
  naturezaDoCliente: string
  instituicaoFinanceiraCredenciada: string
  cnpjInstituicaoFinanceiraCredenciada: string
  tipoDeGarantia: string
  tipoDeExcepcionalidade: string
  situacaoDoContrato: string
}


export type OperacaoCreateRequest = Omit<Operacao, 'id'>

export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}


export interface InsightUfTotal {
  uf: string
  total: number
}

export interface TopSetor {
  setor: string
  total: number
}


export interface ImportResult {
  total: number
  imported: number
  skipped: number
}


export interface OperacaoFiltros {
  uf?: string
  setor?: string
  valorMinimo?: number
  page?: number
  size?: number
  sort?: string
}
