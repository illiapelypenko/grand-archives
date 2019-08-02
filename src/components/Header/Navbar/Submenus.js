import React from "react";
import { Link } from "react-router-dom";

export default function Submenus(props) {
  return (
    <div className={`submenus ${props.showSubmenus ? "" : "hidden"}`}>
      <p className='submenu'>
        <Link
          to='/content'
          onClick={e => {
            props.onSubmenuClick(e, "videos");
          }}
        >
          Videos
        </Link>
      </p>
      <div className='vertical-line' />
      <p className='submenu'>
        <Link
          onClick={e => {
            props.onSubmenuClick(e, "pictures");
          }}
          to='/content'
        >
          Pictures
        </Link>
      </p>
      <div className='vertical-line' />

      <p className='submenu'>
        <Link
          onClick={e => {
            props.onSubmenuClick(e, "audios");
          }}
          to='/content'
        >
          Audios
        </Link>
      </p>
      <div className='vertical-line' />

      <p className='submenu'>
        <Link
          onClick={e => {
            props.onSubmenuClick(e, "texts");
          }}
          to='/content'
        >
          Texts
        </Link>
      </p>
    </div>
  );
}
