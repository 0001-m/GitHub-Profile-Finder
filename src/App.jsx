import { useState } from "react"

export default function App() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)

      if (!response.ok) {
        throw new Error("User not found")
      }
      const data = await response.json()
      setUser(data);
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col items-center pt-20 px-4">

      <h1 className="text-3xl font-bold mb-8">GitHub Profile Finder</h1>

      <div className="flex gap-2 mb-8">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none w-64 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {user && !loading && (
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center gap-3 w-80">
          <img src={user.avatar_url} className="rounded-full w-24 h-24" />
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-400 text-sm text-center">{user.bio}</p>
          <div className="flex gap-6 mt-2">
            <div className="text-center">
              <p className="font-bold">{user.followers}</p>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.public_repos}</p>
              <p className="text-gray-400 text-sm">Repos</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}