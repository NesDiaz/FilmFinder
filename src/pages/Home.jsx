import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useLocation, useNavigate } from "react-router-dom"



function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

useEffect(() => {
  const fetchMovies = async (query) => {
    try {
      setLoading(true)

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      )

      const data = await response.json()

      if (data.Search) {
        setMovies(data.Search)
      } else {
        setMovies([])
      }

    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const params = new URLSearchParams(location.search)
  const queryParam = params.get("query")

  if (queryParam) {
    setSearchTerm(queryParam)
    fetchMovies(queryParam)
  } else {
    fetchMovies("batman")
  }

}, [location.search, API_KEY])

const handleSearch = () => {
  if (searchTerm.trim() !== "") {
    navigate(`/search?query=${searchTerm}`)
  }
}

  // 🔥 Sorting logic
  // Remove duplicate imdbIDs
  const uniqueMovies = movies.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.imdbID === movie.imdbID),
  );

  const sortedMovies = [...uniqueMovies].sort((a, b) => {
    const yearA = parseInt(a.Year);
    const yearB = parseInt(b.Year);

    if (sortOrder === "newest") {
      return yearB - yearA;
    }

    if (sortOrder === "oldest") {
      return yearA - yearB;
    }

    return 0;
  });
  return (
  <div className="home">
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
    />

    {/* 🔥 Sort Dropdown */}
    <div className="sort-container">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">Sort By Year</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    {/* 🔥 Loading Spinner */}
    {loading && (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    )}

    {/* 🔥 No Results */}
    {!loading && movies.length === 0 && (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No movies found.
      </p>
    )}

    {/* 🔥 Movie Grid */}
    {!loading && movies.length > 0 && (
      <div className="movie-grid">
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    )}
  </div>
  )
}
export default Home