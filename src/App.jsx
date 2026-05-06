import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Sidebar from "./components/Sidebar"

import MiniPlayer from "./components/MiniPlayer"

import FullPlayer from "./components/FullPlayer"

import Home from "./pages/Home"

import Favorites from "./pages/Favorites"

function App() {

  return (
    <BrowserRouter>

      <div className="flex bg-black text-white min-h-screen">

        <Sidebar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

        </Routes>

        <MiniPlayer />

        <FullPlayer />

      </div>

    </BrowserRouter>
  )
}

export default App