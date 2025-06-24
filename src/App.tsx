import { useState, useEffect } from 'react'
import axios from 'axios'

type Murmur = {
  id: number
  content: string
  createdAt: string
  user: { id: number; name: string }
  likes: { userId: number; murmurId: number }[]
}

const USER_ID = 1

function App() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchTimeline = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `/api/murmurs/timeline?userId=${USER_ID}&page=${page}`,
      )
      setMurmurs(res.data)
    } catch (error) {
      console.error('Error fetching timeline:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (murmurId: number) => {
    try {
      await axios.post(`/api/murmurs/${murmurId}/like`, { userId: USER_ID })
      fetchTimeline() // refresh timeline to update like count
    } catch (err) {
      console.error('Like failed:', err)
    }
  }

  useEffect(() => {
    fetchTimeline()
  }, [page])

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>🟦 Murmur Timeline</h2>

      {loading ? (
        <p>Loading...</p>
      ) : murmurs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No murmurs found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {murmurs.map((murmur) => (
            <li
              key={murmur.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <p style={{ marginBottom: '8px' }}>
                <strong>{murmur.user.name}</strong>
              </p>
              <p style={{ marginBottom: '10px' }}>{murmur.content}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                {new Date(murmur.createdAt).toLocaleString()} ·{' '}
                {murmur.likes.length}{' '}
                {murmur.likes.length === 1 ? 'like' : 'likes'}
              </p>
              <button
                onClick={() => handleLike(murmur.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Like
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{
            padding: '6px 12px',
            marginRight: '10px',
            backgroundColor: page === 1 ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>
        <span style={{ fontWeight: 'bold' }}>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          style={{
            padding: '6px 12px',
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
