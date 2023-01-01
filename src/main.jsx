import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {firebaseConnection} from './firebase/config.js'

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
