import React from "react";
import ReactDOM from "react-dom/client";
import SettingsProvider from "contexts/settingsContext";
import App from "./App";
import "./style.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

// third-party library css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "nprogress/nprogress.css";
import "react-quill/dist/quill.snow.css";
import "simplebar-react/dist/simplebar.min.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { AuthProvider } from "contexts/AuthContext";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <SettingsProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </SettingsProvider>
);
