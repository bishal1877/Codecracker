"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const Msg = ({ msgid }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!msgid) {
      setLoading(false);
      return;
    }

    const fetchMessage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/msgbyid`, {
          params: { id: msgid }
        });
        if (res.data.success) {
          setMessage(res.data.msg);
          setError(null);
        } else {
          setError(res.data.message || "Failed to load message");
          toast.error(res.data.message);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching message: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [msgid]);

  if (loading) return <div>Loading message...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!message) return <div>No message found</div>;

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "0px 0px 0px 0px",
        marginBottom: "0px",
        border: "1px solid black",
        borderLeftWidth:"0px",
        borderRightWidth:"0px",
        borderTop:"0px",
        height: "maxcontent",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: "bold", color: "green" ,display:"flex",gap:"10px"}}>
          <Image
            src={message.url != null ? `${message.url}` : "/dp.png"}
            alt="User avatar"
            width={40}
            height={40}
            style={{ borderRadius: "50%", width: "23px", height: "23px" }}
          />
          ~{message.name}
        </div>
        {message.qimg && (
          <div
            style={{ marginTop: "10px", width: "100%" }}
          >
            <Image
              src={message.qimg}
              alt="Message attachment"
              width={200}
              height={200}
              style={{
                borderRadius: "4px",
                width: "100%",
                objectFit:"contain",
                maxHeight: "30vh",
                justifySelf:"center",borderRadius:"10px"
              }}
            />
          </div>
        )}
        <div
          style={{
            fontSize: "14px",
            color: "red",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {message.msg} 
        </div>
      </div>
    </div>
  );
};

export default Msg;
