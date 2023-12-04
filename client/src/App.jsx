import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserSettings from "./pages/UserSettings/UserSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/settings" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
