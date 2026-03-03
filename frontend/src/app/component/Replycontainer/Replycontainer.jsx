"use client";
import React from 'react'
import styles from "./replycontain.module.css"
import Msg from "@/app/component/Msg/Msg";
import Reply from "@/app/component/Reply/Reply";
import Input from "@/app/component/Input/Input";
import { useEffect,useState } from 'react';


const Replycontainer = ({search}) => {
    console.log(search);
  return (
      <div className={`${styles.replyinner}`}>
        <div
          className={`${styles.msgrep}`}
        >
          <Msg msgid={search} />
          <Reply msgid={search}/>
        </div>
        <Input />
      </div>
  );
}

export default Replycontainer