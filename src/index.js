import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@@/context/AuthProvider";
import { FilterProvider } from "@@/context/FilterProvider";
import "@@/index.css";
import App from "@@/App";
import toast, { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Toaster />
      <BrowserRouter>
      <AuthProvider>
        <FilterProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </FilterProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
