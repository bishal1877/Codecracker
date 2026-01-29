import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
const Header = (props) => {
  let lang =
    `${props.heading}`.charAt(0).toUpperCase() +
    `${props.heading}`.slice(1, `${props.heading}`.length);
  if (props.heading.charAt(0) == "c") lang = "C++";
  let imna = "";
  if (`${props.heading}` == "javascript") imna = "Js";
  else if (`${props.heading}` == "rust") imna = "Rs";
  else if (`${props.heading}` == "java") imna = "Jv";
  else if (`${props.heading}` == "react") imna = "react";
  else if (`${props.heading}` == "python") imna = "Py";
  else imna = "cpp";
  return (
    <div className={`${styles.heading}`}>
      <Image
        className={`${styles.icon}`}
        src={`/${imna}.jpg`}
        width={32}
        height={32}
        alt="dee"
      ></Image>{" "}
      <p style={{alignSelf:"center", textDecoration:"underline" ,textDecorationThickness:"1.2px"}} > {lang} Forum</p>
    </div>
  );
};

export default Header;
