import { useEffect, useState } from 'react'
import { API_BASE_URL, buildApiUrl, getEnvironmentNotice, normalizeListResponse } from '../utils/api.js'

const RESOURCE = 'workouts'

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadWorkouts() {
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

    loadWorkouts()
  }, [])

  return (
    <section className="page-content">
      <h2>Workouts</h2>
      <p className="page-note">{getEnvironmentNotice()}</p>
      <p className="endpoint">Endpoint: <code>{`${API_BASE_URL}/${RESOURCE}`}</code></p>

      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">Error loading workouts: {error}</p>}
      {!loading && !error && (
        <div className="data-list">
          {items.length === 0 ? (
            <p>No workouts found.</p>
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

export default Workouts
