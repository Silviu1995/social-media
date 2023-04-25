import Home from "./pages/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Messenger from "./pages/messenger/Messenger";
function App() {
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={user ? <Home/> :<Login/>  }/>
        <Route path="login" element={user ? <Navigate to="/" replace={true} /> : <Login/>}/>
        <Route path="register" element={user ? <Navigate to="/" replace={true} /> : <Register/>}/>
        <Route path="profile/:username" element={user ? <Profile/>  : <Navigate to="/" replace={true} />}/>
        <Route path="messenger" element={!user ? <Navigate to="/" replace={true} /> : <Messenger/>}/>
      </Routes>
    </div>
  );
}

export default App;
