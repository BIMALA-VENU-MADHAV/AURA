import {
  Home,
  Heart,
  Search,
  User,
} from "lucide-react"

import {
  NavLink,
} from "react-router-dom"

function Sidebar() {

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Home",
    },

    {
      path: "/search",
      icon: Search,
      label: "Search",
    },

    {
      path: "/favorites",
      icon: Heart,
      label: "Favorites",
    },

    {
      path: "/profile",
      icon: User,
      label: "Profile",
    },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-32 h-screen shrink-0 flex-col items-center py-10 border-r border-white/5 bg-black/40 backdrop-blur-2xl">
        <h1 className="text-2xl font-bold mb-16">
          Aura
        </h1>

        <div className="flex flex-col gap-6">

          {navItems.map((item) => {

            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                    group flex flex-col items-center gap-2 p-4 rounded-3xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-white text-black"
                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                    }
                  `
                }
              >

                <Icon size={24} />

                <span className="text-xs">
                  {item.label}
                </span>

              </NavLink>
            )
          })}

        </div>

      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/70 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around z-50">

        {navItems.map((item) => {

          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex flex-col items-center gap-1 transition
                  ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500"
                  }
                `
              }
            >

              <Icon size={22} />

              <span className="text-[10px]">
                {item.label}
              </span>

            </NavLink>
          )
        })}

      </div>
    </>
  )
}

export default Sidebar