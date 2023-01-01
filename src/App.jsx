import "./App.css";
import Header from "./components/Header";
import Expeditions from "./pages/Expeditions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Conveyance from "./pages/Conveyance";
import Workers from './pages/Workers'
import Raids from './pages/Raids'
import { UserContextProvider } from './context/UserContext'
import CreateFleet from "./pages/CreateFleet";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import Fleets from "./pages/Fleets";

function App() {

  return (
    <BrowserRouter>
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/expeditions" element={<Expeditions />} />
        <Route path="/conveyance" element={<Conveyance />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/raids" element={<Raids />} />
        <Route path="/fleets" element={<Fleets />} />
        <Route path="/createFleet" element={<CreateFleet />} />
      </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
