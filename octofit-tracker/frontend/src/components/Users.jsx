import { useEffect, useState } from 'react'
import { API_BASE_URL, buildApiUrl, getEnvironmentNotice, normalizeListResponse } from '../utils/api.js'

// This component loads data from the Codespace-aware API endpoint:
// https://${CODESPACE_NAME}-8000.app.github.dev/api/users
const RESOURCE = 'users'

function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl(RESOURCE))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const json = await response.json()
        setItems(normalizeListResponse(json))
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="page-content">
      <h2>Users</h2>
      <p className="page-note">{getEnvironmentNotice()}</p>
      <p className="endpoint">Endpoint: <code>{`${API_BASE_URL}/${RESOURCE}`}</code></p>

      {loading && <p>Loading users…</p>}
      {error && <p className="error">Error loading users: {error}</p>}
      {!loading && !error && (
        <div className="data-list">
          {items.length === 0 ? (
            <p>No users found.</p>
          ) : (
            items.map((item, index) => (
              <article className="data-card" key={item._id ?? item.id ?? index}>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  )
}

export default Users
