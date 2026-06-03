"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import styles from "./chat.module.css";
import { toast } from "react-toastify";
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
  const [hoveredMsg, setHoveredMsg] = useState(null);
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
        console.log(dat.data)
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

useEffect(()=>{
console.log(hoveredMsg)
},[hoveredMsg]);

  return (
    <div className={`${styles.chat}`}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className={`${styles.questionsContainer}`} ref={messagesEndRef}>
        {msgs.length == 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>❓</div>
            <h3>No questions yet</h3>
            <p>Be the first to ask a question!</p>
          </div>
        ) : (
          msgs.map((item, ind) => {
            const isYourQuestion = item.name === myname;
            return (
              <Link
                key={ind}
                href={`/chat/reply?msgid=${item.id}`}
                className={styles.questionCard}
                onMouseEnter={() => setHoveredMsg(item.id)}
                onMouseLeave={() => setHoveredMsg(null)}
                style={{
                  backgroundColor:
                    item.id == hoveredMsg ? "#e5f3fa" : "transparent",
                }}
              >
                {console.log(item.id, "nhur")}
                <div className={styles.questionHeader}>
                  <div className={styles.authorSection}>
                    <Image
                      width={40}
                      height={40}
                      className={styles.authorAvatar}
                      alt="user avatar"
                      src={item.url != null ? `${item.url}` : "/dp.png"}
                      objectFit="cover"
                    />
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>
                        {item.name}
                        {isYourQuestion && (
                          <span className={styles.badge}>You</span>
                        )}
                      </div>
                      <div className={styles.timestamp}>
                        Asked at {new Date(item.time).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {hoveredMsg === item.id && (
                    <div className={styles.stats}>
                      <span className={styles.stat}>👁️ 234</span>
                      <span className={styles.stat}>💬 12</span>
                    </div>
                  )}
                </div>

                <div className={styles.questionContent}>
                  <h3 className={styles.questionTitle}>
                    {item.msg.substring(0, 40)}
                  </h3>
                  <p className={styles.questionPreview}>
                    {item.msg.substring(0, 250)}
                  </p>
                </div>
              </Link>
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
