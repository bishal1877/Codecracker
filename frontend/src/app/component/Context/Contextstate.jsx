"use client";
import { Context } from "./Context";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useUser } from "@clerk/nextjs";

let Contextstate = (props) => {
  let [state, setstate] = useState({ socket: null, name: "",userid:"" ,imageurl:"" });
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded) {
      let myname = user?.firstName;
      let userid=user?.id;
      let url=user?.imageUrl
      setstate((prev) => ({ ...prev, name: myname, userid:userid, imageurl:url }));
      const newSocket = io(`${process.env.NEXT_PUBLIC_URL}`);
      setstate((prev) => ({ ...prev, socket: newSocket }));
      console.log("loaded");
      return () => {
        newSocket.disconnect();
        newSocket.off();
      };
    }
  }, [isLoaded]);

  return (
    <Context.Provider value={{ state, setstate }}>
      {props.children}
    </Context.Provider>
  );
};

export default Contextstate;
