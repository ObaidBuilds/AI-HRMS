import "./App.css";
import RootApp from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
        <RootApp />
    </Provider>
  </BrowserRouter>
);
