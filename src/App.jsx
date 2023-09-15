import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSearch from "./components/MainSearch";
import ForecastWeather from "./components/ForecastWeather";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/:lat/:lon/:num/:day" element={<ForecastWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
