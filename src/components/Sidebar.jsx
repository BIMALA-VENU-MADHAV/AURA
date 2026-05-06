import { NavLink } from "react-router-dom"

function Sidebar() {

  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-2xl transition ${
      isActive
        ? "bg-white text-black"
        : "hover:bg-zinc-900"
    }`

  return (
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10">
        Aura
      </h1>

      {/* Navigation */}
      <div className="space-y-3">

        <NavLink
          to="/"
          className={linkStyle}
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={linkStyle}
        >
          Favorites
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar