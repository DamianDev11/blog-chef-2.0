import { useContext } from "react";
import TopBar from "./components/Topbar/TopBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const {user} =useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Home /> : <Login />}/>
        <Route path="/write" element={user ? <Write /> : <Register />}/>
        <Route path="/settings" element={user ? <Settings /> : <Register />}/>
        <Route path="/post/:postId" element={<Single />}/>
      </Routes>
</Router>
  );
}

export default App;
