import Image from "next/image";
import Link from "next/link";
import styles from "@/app/principal/principal.module.css"
export default function Navbar() {
  return (
    <div className={styles["navbar-desk"]}>
      <a href="/principal" className="navbar-container">
         MENU
      </a>
      <a href="/dicas" className="navbar-container">
        DICAS
      </a>
    </div>
  );
}