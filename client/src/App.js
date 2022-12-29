import { Route, Routes } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route strict path="/" element={<Home />}></Route>
        <Route strict path="/login" element={<Login />}></Route>
        <Route strict path="/profile" element={<Profile />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
