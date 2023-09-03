import React from "react";
import styles from "./Game.module.scss";
import text from "../../../public/img/textbanner.png"
import badges1 from "../../../public/img/t1.png"
import badges2 from "../../../public/img/t2.png"
import badges3 from "../../../public/img/t3.png"

import { LazyLoadImage } from "react-lazy-load-image-component";


const content = [
  {
    key: 1,
    img: badges1,
    alt: "badge",
    link: "",
  },
  {
    key: 2,
    img: text,
    alt: "badge",
    link: "",
  },
  {
    key: 3,
    img: badges2,
    alt: "badge",
    link: "",
  },
  {
    key: 4,
    img: text,
    alt: "badge",
    link: "",
  },
  {
    key: 5,
    img: badges3,
    alt: "badge",
    link: "",
  },
  {
    key: 6,
    img: text,
    alt: "badge",
    link: "",
  },

];

const Game = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.itemsF}>
          {content.map((item) => (
            <div className={styles.item} key={item.key}>
              <LazyLoadImage
                src={item.img} 
                alt={item.alt}
              />
            </div>
          ))}
        </div>
        <div className={styles.itemsS}>
          {content.map((item) => (
            <div className={styles.item} key={item.key}>
              <LazyLoadImage
                src={item.img} 
                alt={item.alt}
              />
            </div>
          ))}
        </div>
        <div className={styles.itemsT}>
          {content.map((item) => (
            <div className={styles.item} key={item.key}>
              <LazyLoadImage
                src={item.img} 
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
