'use client'
import React from 'react'
import styles from "./input.module.css";
import Image from 'next/image';

const Input = ( {subm, text, fileuplod, settext, uploadedimg }) => {


  return (
    <div className={`${styles.inp}`}>
      <textarea
        className={`${styles.input}`}
        type="text"
        placeholder="Enter the message..."
        rows={4}
        autoFocus
        value={text}
        onChange={(event) => settext(event.target.value)}
        onKeyDown={(event) => {
          if (event.key == "Enter") subm(event);
        }}
      />
      <div
        style={{
          display: "flex",
          width: "",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems:"center"
        }}
      >
        <>
          <label htmlFor="feel" style={{ height: "50%" }}>
            <Image
              src={
                uploadedimg == null
                  ? "/upload.png"
                  : URL.createObjectURL(uploadedimg)
              }
              height={10}
              width={20}
              alt="file"
              style={{
                cursor: "pointer",
                padding: "8px",
                height: "100%",
                width: "100%",
                borderRadius: "3px",
                objectFit: "contain",
              }}
            ></Image>
          </label>
          <input
            type="file"
            id="feel"
            onChange={fileuplod}
            style={{
              backgroundColor: "green",
              cursor: "pointer",
              width: "0px",
              height: "0",
            }}
          />
        </>

        <Image
          className={`${styles.icon}`}
          src="/send-message.png"
          width={40}
          height={40}
          alt="Picture of the author"
          onClick={subm}
          style={{
            padding: "9px",
            paddingBottom: "14px",
            display: !text ? "none" : null,
            height: "47%",
            width: "44px",
            cursor:"pointer"
          }}
        />
      </div>
    </div>
  );
};

export default Input