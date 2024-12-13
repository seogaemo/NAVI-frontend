import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./assets/styles/index.css";
import Index from "./pages/Index";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
);
