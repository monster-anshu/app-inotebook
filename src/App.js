import "./App.css";
import Home from "./components/Home";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import AlertContext from "./context/AlertContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Loading from "./components/Loading";

function App() {
  return (
    <>
      <BrowserRouter>
        <NoteState>
          <AlertContext>
            <Navbar />
            <div style={{ padding: "1rem 0" }}>
              <Alert alert={alert}></Alert>
              <Loading />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </div>
            </div>
          </AlertContext>
        </NoteState>
      </BrowserRouter>
      <footer>All right revered of inotebook.com @ Himanshu Gunwant</footer>
    </>
  );
}

export default App;
