import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn' },
  { to: '/taste', label: 'Taste' },
  { to: '/journal', label: 'Journal' },
  { to: '/palate', label: 'Palate' },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Sip Journal</span>
          </NavLink>
          <nav className="nav" aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <div className="shell">
        <main className="page">{children}</main>
        <footer className="colophon">
          A tasting notebook for one palate. Notes live in this browser unless you export them.
        </footer>
      </div>
    </div>
  )
}
