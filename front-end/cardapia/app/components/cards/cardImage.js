"use client";
import Image from "next/image";
import styles from "./cardImage.module.css";

export function CardImage({ image, alt, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 90vw, 400px" />
      </div>
      <div className={styles.body}>
        <p>{text}</p>
        <div className={styles.arrow}>→</div>
      </div>
    </a>
  );
}
