import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import React from "react";
import Company from "./pages/Company";
import CompanyOverdue from "./pages/CompanyOverdue";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresas" element={<Company />} />
        <Route path="/empresas-inadimplentes" element={<CompanyOverdue />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<AppRoutes />);
