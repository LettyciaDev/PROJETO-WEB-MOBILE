import { Poppins } from "next/font/google";
import "./dicas.css";
import Intro from "../components/intro";

export default function RootLayout({ children }) {
  return (
    <div className="container">
      <Intro />
      <div className="main">
        {children}
      </div>
    </div>
  );
}
