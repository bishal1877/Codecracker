import React from 'react'
import styles from './input.module.css'
import Image from 'next/image';
const Input = () => {
  return (
    <div className={`${styles.inp}`}>
      <textarea
        className={`${styles.input}`}
        type="text"
        placeholder="Enter the message..."
        rows={4}
        autoFocus
      />
      <Image
      className={`${styles.icon}`}
        src="/send-message.png"
        width={40}
        height={40}
        alt="Picture of the author"
      />
    </div>
  );
}
export default Input