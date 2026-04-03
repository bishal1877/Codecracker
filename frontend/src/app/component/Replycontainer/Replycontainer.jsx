"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./replycontain.module.css";
import Msg from "@/app/component/Msg/Msg";
import Reply from "@/app/component/Reply/Reply";
import { toast } from "react-toastify";
import Input from "@/app/component/Input/Input";
import { Context } from "../Context/Context";

const Replycontainer = ({ search }) => {
  const callback = (obj) => {
    if (obj.success) toast.success(obj.mess);
    else toast.error(obj.mess || obj.message);
  };
  const messagesEndRef = useRef(null);
  let [reply, setreply] = useState([]);
  let [uploadedimg, setuploaded] = useState(null);
  let [text, settext] = useState("");
  let pk = useContext(Context);
  let name = pk.state.name;
  let socket = pk.state.socket;
  let subm = (event) => {
    event.preventDefault();
    if (!socket) return;
    socket.emit(
      "sendreply",
      {
        text,
        naam: name,
        id: search,
      },
      callback,
    );
    settext("");
  };
  useEffect(() => {
    if (socket) {
      socket.emit("joinforreply", { msgid: search });
    }
  }, [socket, search]);

  useEffect(() => {
    if (!socket) return;
    const handleNewReply = (obj) => {
      setreply((prev) => [...prev, obj]);
    };

    socket.on("reply", handleNewReply);

    return () => {
      socket.off("reply", handleNewReply);
    };
  }, [socket, search]);

  const fileuplod = (event) => {
    setuploaded(event.target.files[0]);
  };

  const callclick = () => {
  let genmsg = `Click here to join the call with callid=${search}${Date.now()}`;
    settext(genmsg);
  };

  return (
    <div className={`${styles.replycont}`}>
      <div className={`${styles.msgrep}`} ref={messagesEndRef}>
        <Msg msgid={search} callclick={callclick} />
        <Reply msgid={search} reply={reply} setreply={setreply} />
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

export default Replycontainer;
