"use client";
import React,{useEffect, useState,useContext} from 'react'
import styles from "./replycontain.module.css"
import Msg from "@/app/component/Msg/Msg";
import Reply from "@/app/component/Reply/Reply";
import { useUser } from "@clerk/nextjs";
  import { ToastContainer, toast } from "react-toastify";
import Input from "@/app/component/Input/Input";
import { Context } from '../Context/Context';

const Replycontainer = ({search}) => {

const callback=(obj)=>{
  if(obj.success)
    toast.success(obj.mess)
  else
  toast.error(mess);
}

  let [reply, setreply] = useState([]);
  const { user, isLoaded } = useUser();
  let [uploadedimg, setuploaded] = useState(null);
  let [text, settext] = useState("");
  let pk = useContext(Context);
  let name = user?.firstName;
  let socket = pk.state.socket;
  let subm = (event) => {
    event.preventDefault();
    socket.emit("sendreply", {
      text,
      naam: name,
      id: search,
    },callback);
    settext("");
  };
  useEffect(() => {
    socket.emit("joinforreply", { msgid: search });
  }, []);

  useEffect(() => {
    const handleNewReply = (obj) => {

      setreply((prev) => [
        ...prev,
        obj
      ]);
    };
    
    socket.on("reply", handleNewReply);

    // 3. Cleanup: ONLY remove this specific listener
    return () => {
      socket.off("reply", handleNewReply);
    };
  }, [socket, search]); 

  const fileuplod = (event) => {
    setuploaded(event.target.files[0]);
  };

  return (
    <div className={`${styles.replyinner}`}>
      <ToastContainer />
      <div className={`${styles.msgrep}`}>
        <Msg msgid={search} />
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
}

export default Replycontainer;