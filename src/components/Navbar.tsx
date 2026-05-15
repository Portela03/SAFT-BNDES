import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', icon: '📊', label: 'Dashboard', end: true },
  { to: '/operacoes', icon: '📋', label: 'Operações', end: true },
  { to: '/operacoes/nova', icon: '➕', label: 'Nova Operação' },
  { to: '/importacao', icon: '📤', label: 'Importar CSV' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Navbar({ isOpen, onClose }: Props) {
  return (
    <aside
      className={`fixed left-0 top-0 w-64 bg-blue-900 min-h-screen flex flex-col z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-blue-800">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-xl font-bold">B</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-xl leading-tight">SAFT-BNDES</h1>
              <p className="text-blue-300 text-xs truncate">Financiamento Tecnológico</p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden text-blue-300 hover:text-white transition shrink-0"
            aria-label="Fechar menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            <span className="text-base leading-none">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-blue-800">
        <p className="text-blue-400 text-xs">Portal de Dados Abertos BNDES</p>
        <p className="text-blue-500 text-xs mt-0.5">© 2026 SAFT-BNDES</p>
      </div>
    </aside>
  )
}
