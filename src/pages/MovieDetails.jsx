import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom" 

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
 const [loading, setLoading] = useState(true)
const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

 useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      )

      const data = await response.json()
      setMovie(data)

    } catch (error) {
      console.error("Error fetching movie details:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchMovieDetails()
}, [id, API_KEY])

 if (loading) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  )
}

  return (
    <div className="details-container">
      <div className="details-card">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
        />

        <div className="details-info">
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p className="plot">{movie.Plot}</p>

          <button className="back-btn" onClick={() => navigate(-1)}>
  ← Back to Results
</button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails