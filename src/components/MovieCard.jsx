import { Link, useLocation } from "react-router-dom"

function MovieCard({ movie }) {
  const location = useLocation()

  return (
    <div className="movie-card">
      <Link
        to={`/movie/${movie.imdbID}`}
        state={{ from: location.pathname + location.search }}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={movie.Title}
          onError={(e) => {
            e.target.src = "/placeholder.png"
          }}
        />

        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard