import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";

import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import CriarConta from './pages/CriarConta'

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />}/>
      <Route path="criar-conta" element={<CriarConta />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);