import Link from "next/link";
import Image from "next/image";
import cardImage from "./cardImage.css";

export const CardImage = ({ image, alt, text, href }) => {
  return (
    <Link
      href={href || "#"}
      className="link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="cards">
        <Image src={image} alt={alt} width={107} height={92}></Image>
        <p>{text}</p>
      </div>
    </Link>
  );
};
