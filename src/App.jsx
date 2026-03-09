import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/landing"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App