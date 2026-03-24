import Image from "next/image";
import cardImage from "./cardImage.css";

export const CardImage = ({ image, alt, text }) => {
  return (
    <div className="cards">
      <Image src={image} alt={alt} width={107} height={92}></Image>
      <p>{text}</p>
    </div>
  );
};
