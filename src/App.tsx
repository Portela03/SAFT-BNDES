import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import OperacoesPage from './pages/OperacoesPage'
import OperacaoDetalhesPage from './pages/OperacaoDetalhesPage'
import NovaOperacaoPage from './pages/NovaOperacaoPage'
import EditarOperacaoPage from './pages/EditarOperacaoPage'
import ImportacaoPage from './pages/ImportacaoPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Navbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
          {/* Mobile top bar */}
          <header className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center gap-3 px-4 py-3 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 transition"
              aria-label="Abrir menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-bold text-blue-900 text-lg">SAFT-BNDES</span>
          </header>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/operacoes" element={<OperacoesPage />} />
              <Route path="/operacoes/nova" element={<NovaOperacaoPage />} />
              <Route path="/operacoes/:id" element={<OperacaoDetalhesPage />} />
              <Route path="/operacoes/:id/editar" element={<EditarOperacaoPage />} />
              <Route path="/importacao" element={<ImportacaoPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
