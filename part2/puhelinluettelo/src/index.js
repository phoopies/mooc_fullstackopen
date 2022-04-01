import App from "./App";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById("app");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);
