import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Landing() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`)
    }
  }

  return (
    <div className="landing">
      <h1 className="landing-title">FilmFinder 🎬</h1>
      <p className="landing-subtitle">Find your favorite films</p>

      <form onSubmit={handleSubmit} className="landing-search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

    </div>
  )
}

export default Landing