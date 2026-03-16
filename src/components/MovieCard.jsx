import { Link } from "react-router-dom"

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={movie.Title}
          onError={(e) => {
            e.target.src = "/public/placeholder.png"
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