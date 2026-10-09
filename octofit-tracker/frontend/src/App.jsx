import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { path: '/activities', label: 'Activities', number: '01' },
  { path: '/leaderboard', label: 'Leaderboard', number: '02' },
  { path: '/teams', label: 'Teams', number: '03' },
  { path: '/users', label: 'Members', number: '04' },
  { path: '/workouts', label: 'Workouts', number: '05' },
]

function Workspace() {
  const location = useLocation()
  const activeSection = sections.find(({ path }) => location.pathname.startsWith(path)) ?? sections[0]

  return (
    <div className="tracker-shell">
      <aside className="sidebar">
        <NavLink className="brand-lockup" to="/activities" aria-label="OctoFit home">
          <img src={logo} alt="" className="brand-logo" />
          <span className="brand-type">
            <strong>OctoFit</strong>
            <small>TRAINING CLUB</small>
          </span>
        </NavLink>

        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="section-nav" aria-label="Tracker sections">
          {sections.map(({ path, label, number }) => (
            <NavLink className="section-link" key={path} to={path}>
              <span className="section-number">{number}</span>
              <span>{label}</span>
              <span className="section-arrow" aria-hidden="true">↗</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="connection-mark" aria-hidden="true" />
          <span>API · PORT 8000</span>
        </div>
      </aside>

      <main className="workspace-main">
        <header className="topbar">
          <div className="breadcrumb-label">
            OCTOFIT <span aria-hidden="true">/</span> <strong>{activeSection.label}</strong>
          </div>
          <div className="topbar-note"><span className="topbar-dot" /> Movement, measured.</div>
        </header>

        <div className="workspace-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return <Workspace />
}
