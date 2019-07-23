import React from "react";

export default function Socials() {
  return (
    <div>
      {/* <a
        target='__blank'
        href={`https://twitter.com/share?url=${encodeURI(
          "http://localhost:3000/content"
        )}`}
      >
        Tweet
      </a> */}
      <a
        target='__blank'
        href={`https://twitter.com/intent/tweet?url=${encodeURI(
          "https://average-firefox-61.localtunnel.me"
        )}`}
      >
        Share on Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
          "https://average-firefox-61.localtunnel.me"
        )}`}
      >
        Share on Facebook
      </a>
    </div>
  );
}
