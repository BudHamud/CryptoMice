import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lateral from "./components/Lateral";
import Spaceships from "./pages/Spaceships";
import Workers from './pages/Workers'
import Raids from './pages/Raids'
import { UserContextProvider } from './context/UserContext'
import CreateFleet from "./pages/CreateFleet";

function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spaceships" element={<Spaceships />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/raids" element={<Raids />} />
        <Route path="/createFleet" element={<CreateFleet />} />
      </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
