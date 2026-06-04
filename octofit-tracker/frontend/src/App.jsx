import { NavLink, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL, getEnvironmentNotice } from './utils/api.js'
import './App.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

function Home() {
  return (
    <section className="page-content">
      <h2>Welcome to OctoFit Tracker</h2>
      <p>
        This React 19 presentation tier uses Vite environment variables via
        <code>import.meta.env.VITE_CODESPACE_NAME</code> to build API URLs.
      </p>
      <p>
        When the variable is defined, the app requests data from
        <code>https://{import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/</code>.
      </p>
      <p>
        If <code>VITE_CODESPACE_NAME</code> is unset, the app falls back to
        <code>http://localhost:8000/api/</code> so the UI remains safe and usable.
      </p>
    </section>
  )
}

function NotFound() {
  return (
    <section className="page-content">
      <h2>Page not found</h2>
      <p>Choose a page from the navigation menu to continue.</p>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>OctoFit Tracker</h1>
          <p className="app-description">
            Multi-tier React frontend with router-driven navigation and safe Vite env handling.
          </p>
        </div>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <section className="status-bar">
        <p>{getEnvironmentNotice()}</p>
        <p className="endpoint">API base: <code>{API_BASE_URL}</code></p>
      </section>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
