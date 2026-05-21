import { createRoot } from "react-dom/client";
import App from "./iris"
//import App from "./SVG";

createRoot(document.querySelector("#content")).render(<App />);