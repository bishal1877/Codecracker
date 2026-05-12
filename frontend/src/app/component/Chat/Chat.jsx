"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import styles from "./chat.module.css";
import {  toast } from "react-toastify";
import axios from "axios";
import { Context } from "../Context/Context";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Input from "../Input/Input";
let socket;

const Chat = ({ room }) => {
  let pk = useContext(Context);
  let [msgs, setmg] = useState([]);
  let [uploadedimg, setuploaded] = useState(null);
  const messagesEndRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { user, isLoaded } = useUser();
  let [userdata, setuserdata] = useState({
    name: "",
    room: `${room}`,
    url: null,
  });

  let [text, settext] = useState("");

  let subm = (event) => {
    setProgress(progress + 20);
    event.preventDefault();
    let newmsg = {
      name: pk.state.name,
      msg: text,
      room: room,
    };
    let res;
    const imgbhejo = async () => {
      const formData = new FormData();
      formData.append("uploadedfile", uploadedimg);
      setProgress(progress + 10);
      setProgress(progress + 20);
      res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            
          },
        },
      );
      setProgress(progress + 10);
      if (!res.data.success) {
        toast.error(`${res.data.message}`);
      } else {
        setProgress(progress + 10);
        socket.emit("sendmsg", {
          text,
          naam: newmsg.name,
          room,
          url: pk.state.imageurl,
          qimg: res.data.imageUrl,
        });
      }
      setProgress(100);
      setuploaded(null);
    };
    if (uploadedimg != null) {
      setProgress(progress + 20);
      imgbhejo();
    } else {
      setProgress(progress + 10);
      setProgress(progress + 30);
      socket.emit("sendmsg", {
        text,
        naam: newmsg.name,
        room,
        url: pk.state.imageurl,

        qimg: null,
      });
      setProgress(100);
    }
    settext("");
  };

  const resp = null;
  let myname = pk.state.name;
  useEffect(() => {
    async function fetchmsg() {
      try {
        setProgress(progress + 10);
        setProgress(progress + 30);
        const dat = await axios.get(`${process.env.NEXT_PUBLIC_URL}/msg`, {
          params: { room: room },
          withCredentials: true,
        });
        setProgress(progress + 30);
        if (dat.data.success) {
          setmg((prev) => [...prev, ...dat.data.mess]);
        } else toast.error(dat.data.message);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setProgress(100);
      }
    }
    fetchmsg();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [msgs]);
  useEffect(() => {
    if (pk.state.socket) {
      socket = pk.state.socket;
      socket.emit("join", { room });

      socket.on("message", (msg) => {
        setmg((prev) => [...prev, msg]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [pk.state.socket, room]);
  const fileuplod = (event) => {
    setuploaded(event.target.files[0]);
  };

  return (
    <div className={`${styles.chat}`}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className={`${styles.chatinner}`} ref={messagesEndRef}>
        {msgs.length == 0 ? (
          <div>Loading messages...</div>
        ) : (
          msgs.map((item, ind) => {
            return (
              <div
                key={ind}
                style={{
                  display: "flex",
                  justifyContent: item.name === myname ? "end" : "start",
                }}
              >
                <div
                  className={`${styles.chatcompo}`}
                  style={{
                    backgroundColor: item.name === myname ? "#d9fdd3" : "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "5px",
                    }}
                  >
                    {item.name != myname ? (
                      <Image
                        width={19}
                        sizes="(max-height: 8px)"
                        height={5}
                        className={`${styles.imag}`}
                        alt="dp"
                        src={item.url != null ? `${item.url}` : "/dp.png"}
                        objectFit="cover"
                      ></Image>
                    ) : (
                      <></>
                    )}
                    {item.name != myname ? (
                      <div style={{ color: "green" }}>{`~${item.name}`}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Link href={`/chat/reply?msgid=${item.id}`}>
                    {`${item.msg.substring(0, 120)}`}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Input
        subm={subm}
        text={text}
        fileuplod={fileuplod}
        settext={settext}
        uploadedimg={uploadedimg}
      />
    </div>
  );
};

export default Chat;
