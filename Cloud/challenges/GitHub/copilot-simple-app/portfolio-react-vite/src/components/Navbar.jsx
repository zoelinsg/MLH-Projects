import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(false)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#hero">
          Portfolio
        </a>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          <span className="navbar__hamburger" />
          <span className="navbar__hamburger" />
          <span className="navbar__hamburger" />
        </button>

        <div className={`navbar__menu ${open ? 'navbar__menu--open' : ''}`}>
          <div className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className="navbar__link"
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </nav>
  )
}
