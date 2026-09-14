import ReactDOM from "react-dom/client";
import App from "./App";
import "./site.css";

// NOTE: no StrictMode — its dev double-mount freezes @remotion/player's
// autoplay loop (hero stuck at frame 0). See Hero.tsx for the play() guard.
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
