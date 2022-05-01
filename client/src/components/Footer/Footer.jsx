import React from "react";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <footer id={s.foot}>
      <p>
        Created by{" "}
        <a
          href="https://www.linkedin.com/in/alegalus/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alejandro Galus
        </a>
      </p>
    </footer>
  );
}
