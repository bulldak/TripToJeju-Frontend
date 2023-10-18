import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CheckInfo from "./pages/CheckInfo";
import ShowOptions from "./pages/ShowOptions";
import DetailRoute from "./pages/DetailRoute";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/checkinfo" element={<CheckInfo />}></Route>
          <Route path="/options" element={<ShowOptions />}></Route>
          <Route path="/details" element={<DetailRoute />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
