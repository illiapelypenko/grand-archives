import React from "react";
import TwitterIcon from "./TwitterIcon";
import FacebookIcon from "./FacebookIcon";
import TelegramIcon from "./TelegramIcon";

export default function Socials() {
  const url = "https://angry-grasshopper-81.localtunnel.me";

  return (
    <div className='socials'>
      <p>Share us on:</p>
      <a
        className='socials__item'
        target='__blank'
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <TwitterIcon />
      </a>
      <a
        className='socials__item'
        target='__blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        <FacebookIcon />
      </a>
      <a
        className='socials__item'
        target='__blank'
        href={`https://telegram.me/share/url?url=${url}&text=${"Grand Archives"}`}
      >
        <TelegramIcon />
      </a>
    </div>
  );
}
