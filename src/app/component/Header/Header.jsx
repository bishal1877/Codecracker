import React from 'react'
import styles from './header.module.css'

const Header = (props) => {
let lang =
  `${props.heading}`.charAt(0).toUpperCase() +
  `${props.heading}`.slice(1, `${props.heading}`.length );
  if(props.heading.charAt(0)=='c')
    lang='C++';
  return (
    <div className={`${styles.heading}`}>
      <p>{lang} Forum</p>
    </div>
  );
}

export default Header