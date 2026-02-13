"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./chat.module.css";
import { io } from "socket.io-client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
let socket;

const Chat = ({ room }) => {
  let [msgs, setmg] = useState([]);
  const messagesEndRef = useRef(null);
  const sendopt = useRef(null);
  const { user, isLoaded } = useUser();

  let [userdata, setuserdata] = useState({
    name: "",
    room: `${room}`,
    url: null,
  });

  let [text, settext] = useState("");

  let subm = (event) => {
    event.preventDefault();
    let newmsg = {
      name: user?.firstName,
      msg: text,
      room: room,
    };

    socket.emit("sendmsg", { text, naam: newmsg.name, room });

    settext("");
  };

  const resp = null;
  let myname = user?.firstName;
  useEffect(() => {
    async function fetchmsg() {
      try {
        const dat = await axios.get("https://codecracker-ka2c.onrender.com/msg", {
          params: { room: room },
        });
        if (dat.data.success) {
          setmg((prev) => [...prev, ...dat.data.mess]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchmsg();
    socket = io("https://codecracker-ka2c.onrender.com");

    socket.emit("join", { room });

    return () => {
      socket.off();
    };
  }, []);

  let [uploadedimg, setuploaded] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [msgs]);
  useEffect(() => {
    socket.on("message", (msg) => {
      setmg((prev) => [...prev, msg]);
    });

    myname = user?.firstName;
    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, [isLoaded]);

  const fileuplod = (event) => {
    setuploaded(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className={`${styles.chat}`}>
      <div className={`${styles.chatinner}`} ref={messagesEndRef}>
        {msgs.length == 0 ? (
          <div>
            Loading messages...
            {console.log(msgs)}
          </div>
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {item.name != myname ? (
                      <Image
                        width={19}
                        sizes="(max-height: 8px)"
                        height={5}
                        className={`${styles.imag}`}
                        alt="dp"
                        src={user?.hasImage ? `${user?.imageUrl}` : "/dp.png"}
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

                  {`${item.msg.substring(0,120)}.....`}
                </div>
              </div>
            );
          })
        )}
      </div>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <>
            <label htmlFor="feel">
              {" "}
              <Image
                src={uploadedimg == null ? "/upload.png" : uploadedimg}
                height={10}
                width={20}
                alt="file"
                style={{
                  cursor: "pointer",
                  padding: "1px",
                  height: "55px",
                  width: "30px",
                  borderRadius: "3px",
                  objectFit: "contain",
                }}
              ></Image>{" "}
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
            ref={sendopt}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
