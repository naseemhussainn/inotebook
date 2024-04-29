import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/inotebook/NoteState";
import { Toaster,toast } from 'sonner';
import Login from "./components/Login";
import SignUp from "./components/SignUp";


function App() {
  return (
    <>
      <Notestate>
        <Navbar />
        <Toaster/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Notestate>
    </>
  );
}

export default App;
