import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import MiniPlayer from "./components/MiniPlayer"
import FullPlayer from "./components/FullPlayer"
import Search from "./pages/Search"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"

function Layout(){

  const location=useLocation()

  const isAuthPage=
    location.pathname==="/login"||
    location.pathname==="/signup"

  return(
    <div className="flex h-screen overflow-hidden bg-black text-white">

      {/* Sidebar */}
      {!isAuthPage&&(
        <div className="w-32 h-screen shrink-0">
          <Sidebar/>
        </div>
      )}

      {/* Pages */}
      <div className="flex-1 overflow-y-auto">

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>

      </div>

      {/* Players stay visible */}
      <MiniPlayer/>
      <FullPlayer/>

    </div>
  )

}

function App(){

  return(
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  )

}

export default App