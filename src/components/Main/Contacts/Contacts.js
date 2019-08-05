import React from "react";
import "./Contacts.scss";
import Map from "./Map.js";
import Info from "./Info";

export default function Contacts() {
  return (
    <div className='contacts'>
      <Info />
      <Map />
    </div>
  );
}
