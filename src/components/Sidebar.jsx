import {
  Home,
  Heart,
  Search,
  Menu,
  X,
} from "lucide-react"

import {
  NavLink,
} from "react-router-dom"

import {
  useState,
} from "react"

function Sidebar() {

  const [open, setOpen] =
    useState(false)

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
      isActive
        ? "bg-white text-black"
        : "hover:bg-zinc-900"
    }`

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-zinc-800">

        <h1 className="text-2xl font-bold">
          Aura
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
        >
          <Menu />
        </button>

      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-72 bg-zinc-950 border-r border-zinc-800 p-6
          transform transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Top */}
        <div className="flex items-center justify-between mb-10">

          <h1 className="text-3xl font-bold">
            Aura
          </h1>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="md:hidden"
          >
            <X />
          </button>

        </div>

        {/* Links */}
        <div className="space-y-3">

          <NavLink
            to="/"
            className={linkStyle}
            onClick={() =>
              setOpen(false)
            }
          >
            <Home size={20} />
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={linkStyle}
            onClick={() =>
              setOpen(false)
            }
          >
            <Heart size={20} />
            Favorites
          </NavLink>

          <NavLink
            to="/search"
            className={linkStyle}
            onClick={() =>
              setOpen(false)
            }
          >
            <Search size={20} />
            Search
          </NavLink>

        </div>

      </div>
    </>
  )
}

export default Sidebar