import { Home, Navigation, Reservations } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
        <header className="w-full bg-gray-800">
          <Navigation></Navigation>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </Router>
  );
}

export default App;