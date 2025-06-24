import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VIEWER_ID = 1 // hardcoded logged-in user

export default function OtherUserPage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/users/${id}?viewerId=${VIEWER_ID}`)
      setUser(res.data)
    } catch (err) {
      console.error('Error fetching user:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    try {
      await axios.post(`/api/users/${user.user.id}/follow`, {
        followerId: VIEWER_ID,
      })
      fetchUser()
    } catch (err) {
      console.error('Follow failed:', err)
    }
  }

  const handleUnfollow = async () => {
    try {
      await axios.delete(`/api/users/${user.user.id}/follow`, {
        data: { followerId: VIEWER_ID },
      })
      fetchUser()
    } catch (err) {
      console.error('Unfollow failed:', err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>User not found</p>

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h2>{user.user.name}'s Profile</h2>
      <p>
        Following: {user.user.followCount} · Followers: {user.followedCount}
      </p>

      <button
        onClick={user.user.isFollowed ? handleUnfollow : handleFollow}
        style={{
          marginBottom: '20px',
          padding: '6px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: user.isFollowed ? '#dc3545' : '#007bff',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        {user.user.isFollowed ? 'Unfollow' : 'Follow'}
      </button>

      <h3>Their Murmurs</h3>
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
          </li>
        ))}
      </ul>
    </div>
  )
}
