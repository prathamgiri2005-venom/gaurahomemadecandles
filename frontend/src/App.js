import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import CareGuidePage from "./pages/CareGuidePage";
import AboutPage from "./pages/AboutPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import EcoCommitmentPage from "./pages/EcoCommitmentPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/care-guide" element={<CareGuidePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/eco-commitment" element={<EcoCommitmentPage />} />
        </Routes>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;
