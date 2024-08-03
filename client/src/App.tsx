import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
