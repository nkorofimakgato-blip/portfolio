import { useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Expertise' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a href="#top" className="brand-mark" aria-label="Nkorofi Makgato home"><span>NM</span><span className="brand-name">Nkorofi Makgato</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? 'Close' : 'Menu'} <span>{menuOpen ? '−' : '+'}</span></button>
        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {links.map((link) => <li key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a></li>)}
        </ul>
        <a className="nav-availability" href="#contact"><span /> Available for opportunities</a>
      </nav>
    </header>
  )
}
