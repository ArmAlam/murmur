import { useEffect, useState } from 'react'
import axios from 'axios'

const USER_ID = 1

export default function OwnUserPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/me?userId=${USER_ID}`)
      setUser(res.data)
    } catch (err) {
      console.error('Failed to fetch user:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteMurmur = async (murmurId: number) => {
    try {
      await axios.delete(`/api/me/murmurs/${murmurId}`, {
        data: { userId: USER_ID },
      })
      fetchUser()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>No user found</p>

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h2>Your Profile</h2>
      <p>
        <strong>{user.name}</strong>
      </p>
      <p>
        Following: {user.followCount} · Followers: {user.followedCount}
      </p>

      <h3 style={{ marginTop: '30px' }}>Your Murmurs</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {user.murmurs.map((murmur: any) => (
          <li
            key={murmur.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '10px',
            }}
          >
            <p>{murmur.content}</p>
            <p style={{ fontSize: '12px', color: '#777' }}>
              {new Date(murmur.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => deleteMurmur(murmur.id)}
              style={{
                marginTop: '8px',
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
