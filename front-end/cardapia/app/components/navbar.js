import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar">
      <a href="/principal" className="navbar-container">
        <Image src="/home.png" alt="home" width={20} height={20} />
        <p>MENU</p>
      </a>
      <a href="/dicas" className="navbar-container">
        <Image src="/tip.png" alt="tip" width={20} height={20} />
        <p>DICAS</p>
      </a>
    </div>
  );
}