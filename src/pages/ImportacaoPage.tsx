import { useNavigate } from 'react-router-dom'
import { useImportViewModel } from '../viewmodels/useImportViewModel'

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fmt(n: number) {
  return (n ?? 0).toLocaleString('pt-BR')
}

export default function ImportacaoPage() {
  const navigate = useNavigate()
  const vm = useImportViewModel()

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Importar Dados do BNDES</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Carregue operações de financiamento via arquivo CSV ou diretamente do portal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Upload de Arquivo CSV</h2>

          <div
            onDragOver={vm.handleDragOver}
            onDragLeave={vm.handleDragLeave}
            onDrop={vm.handleDrop}
            onClick={vm.handleDropZoneClick}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
              ${vm.dragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'}`}
          >
            <input
              ref={vm.fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={vm.handleFileChange}
            />

            {vm.file ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-blue-700">{vm.file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(vm.file.size)}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); vm.clearFile() }}
                  className="text-xs text-red-500 hover:text-red-700 underline mt-1"
                >
                  Remover arquivo
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Arraste o arquivo CSV aqui ou clique para selecionar
                </p>
                <p className="text-gray-400 text-sm">
                  Formato esperado: CSV com delimitador ; e encoding windows-1252
                </p>
              </div>
            )}
          </div>

          <button
            onClick={vm.handleImportCsv}
            disabled={!vm.file || vm.loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
          >
            {vm.loading ? 'Importando...' : 'Enviar CSV'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-700">Importar do Portal BNDES</h2>

          <p className="text-sm text-gray-600">
            Baixa automaticamente o arquivo mais recente do Portal de Dados Abertos do BNDES via
            API CKAN.
          </p>

          <div>
            <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
              Requer conexão com a internet
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 space-y-1">
            <p className="font-medium text-gray-700">O que será importado:</p>
            <p>• Operações de financiamento direto e indireto</p>
            <p>• Dados atualizados do BNDES Open Data</p>
            <p>• Registros duplicados serão ignorados automaticamente</p>
          </div>

          <div className="flex-1" />

          <button
            onClick={vm.handleImportCkan}
            disabled={vm.loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
          >
            {vm.loading ? 'Importando...' : 'Importar do BNDES'}
          </button>
        </div>
      </div>

      {vm.loading && (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Importando dados, aguarde...</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Este processo pode levar alguns minutos dependendo do tamanho do arquivo
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {vm.error && !vm.loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-700">Erro na importação</p>
              <p className="text-sm text-red-600 mt-0.5">{vm.error}</p>
            </div>
          </div>
          <div className="flex gap-2 pl-8">
            <button
              onClick={vm.clearResult}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg transition"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {vm.result && !vm.loading && (
        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Importação concluída!</h3>
              {vm.result.imported === 0 && vm.result.skipped > 0 && (
                <p className="text-sm text-yellow-600 mt-0.5">
                  Nenhum registro novo — todos os dados já estavam no banco.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50 rounded-xl">
            <div className="text-center py-4 px-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total lido
              </p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {fmt(vm.result.total)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">registros</p>
            </div>
            <div className="text-center py-4 px-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Importados
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {fmt(vm.result.imported)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">novos registros</p>
            </div>
            <div className="text-center py-4 px-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ignorados
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {fmt(vm.result.skipped)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">duplicatas</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/operacoes')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Ver Operações
            </button>
            <button
              onClick={vm.clearResult}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Nova Importação
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
