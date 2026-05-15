# SAFT-BNDES — Frontend

Interface web para consulta, gestão e análise das operações de financiamento do BNDES, desenvolvida como trabalho acadêmico da disciplina de Técnicas de Programação.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Arquitetura](#arquitetura)
- [API Backend](#api-backend)
- [Deploy](#deploy)

---

## Sobre o Projeto

O **SAFT-BNDES** é uma aplicação web que consome dados abertos do [Portal de Dados Abertos do BNDES](https://dadosabertos.bndes.gov.br/) para exibir, filtrar, importar e gerenciar operações de financiamento. Os dados podem ser importados diretamente do portal CKAN ou via upload de arquivo CSV.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Dashboard** | Gráficos de financiamentos por UF e top setores CNAE com valores totais agregados |
| **Listagem de Operações** | Tabela paginada com filtros por UF, setor, porte, situação do contrato e período |
| **Detalhes da Operação** | Visualização completa de todos os campos de uma operação individual |
| **Nova Operação** | Formulário para cadastro manual de uma nova operação de financiamento |
| **Editar Operação** | Edição de uma operação existente |
| **Importação de Dados** | Upload de CSV ou importação direta via CKAN com feedback de resultado |

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework UI | [React 19](https://react.dev/) |
| Linguagem | [TypeScript 6](https://www.typescriptlang.org/) |
| Build / Dev Server | [Vite 8](https://vitejs.dev/) |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com/) |
| Roteamento | [React Router DOM 7](https://reactrouter.com/) |
| Gráficos | [Recharts 3](https://recharts.org/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Deploy | [Vercel](https://vercel.com/) |

---

## Estrutura do Projeto

```
src/
├── api/
│   └── operacaoApi.ts          # Funções de acesso à API REST
├── components/
│   ├── FiltroBar.tsx           # Barra de filtros da listagem
│   ├── Layout.tsx              # Layout compartilhado
│   ├── Navbar.tsx              # Barra de navegação lateral
│   ├── OperacaoForm.tsx        # Formulário reutilizável de operação
│   ├── OperacaoTable.tsx       # Tabela de operações
│   ├── Pagination.tsx          # Componente de paginação
│   └── Toast.tsx               # Notificações de feedback
├── pages/
│   ├── DashboardPage.tsx       # Página de dashboard com gráficos
│   ├── EditarOperacaoPage.tsx  # Página de edição de operação
│   ├── ImportacaoPage.tsx      # Página de importação (CSV / CKAN)
│   ├── NovaOperacaoPage.tsx    # Página de cadastro de operação
│   ├── OperacaoDetalhesPage.tsx# Página de detalhes de operação
│   └── OperacoesPage.tsx       # Página de listagem de operações
├── types/
│   └── Operacao.ts             # Interfaces e tipos TypeScript
├── viewmodels/
│   ├── useDetalhesViewModel.ts
│   ├── useEditarOperacaoViewModel.ts
│   ├── useImportViewModel.ts
│   ├── useInsightsViewModel.ts
│   ├── useNovaOperacaoViewModel.ts
│   └── useOperacoesViewModel.ts
├── App.tsx                     # Configuração de rotas
└── main.tsx                    # Ponto de entrada da aplicação
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- Backend [SAFT-BNDES-API](../SAFT-BNDES-API) em execução (local ou remoto)

---

## Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/AB-SAFT-BNDES.git
cd AB-SAFT-BNDES/SAFT-BNDES

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite .env com a URL da sua API

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Compila TypeScript e gera o bundle de produção |
| `npm run preview` | Pré-visualiza o build de produção localmente |

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base em `.env.example`:

```env
VITE_API_URL=http://localhost:8080
```

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base da API backend | `http://localhost:8080` |

> **Nota:** Todas as variáveis expostas ao browser devem ter o prefixo `VITE_`.

---

## Rotas da Aplicação

| Rota | Página |
|---|---|
| `/` | Dashboard com gráficos e métricas |
| `/operacoes` | Listagem paginada de operações com filtros |
| `/operacoes/nova` | Formulário de cadastro de nova operação |
| `/operacoes/:id` | Detalhes de uma operação específica |
| `/operacoes/:id/editar` | Edição de uma operação existente |
| `/importacao` | Importação de dados via CSV ou CKAN |

---

## Arquitetura

O projeto segue o padrão **MVVM (Model-View-ViewModel)** adaptado para React:

- **Model** (`types/`, `api/`): define as entidades de domínio (`Operacao`, `PagedResponse`, etc.) e encapsula as chamadas HTTP.
- **ViewModel** (`viewmodels/`): custom hooks que gerenciam estado, lógica de negócio e efeitos colaterais, mantendo as páginas limpas.
- **View** (`pages/`, `components/`): componentes React puramente presentacionais que consomem os ViewModels.

```
View (pages/components)
        │  usa
        ▼
ViewModel (hooks)
        │  chama
        ▼
API layer (operacaoApi.ts)
        │  HTTP
        ▼
REST API (SAFT-BNDES-API)
```

---

## API Backend

O frontend consome a API REST do projeto [SAFT-BNDES-API](../SAFT-BNDES-API) (Spring Boot). Endpoints principais:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/operacoes` | Lista operações com paginação e filtros |
| `GET` | `/api/operacoes/:id` | Busca uma operação por ID |
| `POST` | `/api/operacoes` | Cria uma nova operação |
| `PUT` | `/api/operacoes/:id` | Atualiza uma operação existente |
| `DELETE` | `/api/operacoes/:id` | Remove uma operação |
| `GET` | `/api/insights/total-por-uf` | Total financiado por UF |
| `GET` | `/api/insights/top-setores` | Top setores por volume financiado |
| `POST` | `/api/carga` | Importa operações via upload CSV |
| `POST` | `/api/carga?resourceId=` | Importa operações do portal CKAN |

---

## Deploy

| Ambiente | URL |
|---|---|
| **Frontend (Vercel)** | [https://saft-bndes.vercel.app](https://saft-bndes.vercel.app/) |
| **Backend (Render)** | [https://saft-bndes-api.onrender.com](https://saft-bndes-api.onrender.com) |

> **Atenção:** A URL do backend pode mudar caso o plano gratuito do Render expire. Nesse caso, atualize a variável `VITE_API_URL` na Vercel.

A aplicação está configurada para deploy na **Vercel**. O arquivo `vercel.json` já inclui a reescrita de rotas necessária para o React Router funcionar em modo SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Para fazer o deploy:

```bash
# Via CLI da Vercel
npx vercel --prod
```

Defina a variável de ambiente `VITE_API_URL` no painel da Vercel apontando para a URL de produção da API.

---

## Licença

Projeto acadêmico — Técnicas de Programação.
