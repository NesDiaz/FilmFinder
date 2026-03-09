function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar
