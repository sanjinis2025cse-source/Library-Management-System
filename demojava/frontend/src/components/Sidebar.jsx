import { NavLink } from 'react-router-dom'

const links = [
  ['📚', 'Dashboard', '/'],
  ['📖', 'Books', '/books'],
  ['✍️', 'Authors', '/authors'],
  ['👥', 'Members', '/members'],
]

export default function Sidebar() {
  return <aside className="sidebar">
    <div className="brand"><span>📚</span> Library</div>
    <nav>{links.map(([icon, label, to]) => <NavLink key={to} to={to} end={to === '/'}>
      <span>{icon}</span>{label}
    </NavLink>)}</nav>
  </aside>
}
