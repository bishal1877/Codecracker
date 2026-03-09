"use client";
import { useEffect, useState,useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import styles from "./reply.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Reply = ({ msgid, reply, setreply }) => {
  const [progress, setProgress] = useState(0);
const messagesEndRef = useRef(null);
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setProgress(30);
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_URL}/reply`, {
          params: { msgid },
        });

        setProgress(70);

        if (resp.data.success) {
          setreply((prev)=>[...prev,...resp.data.replies]);
        } else {
          toast.error(resp.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setProgress(100);
      }
    };

 fetchReplies();
  }, [msgid, setreply]);

  const scrollToBottom = () => {
    console.log('hua kya');
    messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [reply]);

  return (
    <div style={{ padding: "10px" }} className={styles.reply}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      <div ref={messagesEndRef}  className={styles.replyinner}>
        {reply && reply.length > 0 ? (
          <div>
            {reply.map((item, index) => (
              <div
                key={index}
                style={{
                  paddingBottom: "10px",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", gap: "10px", color: "#666" }}>
                  {item.author && <small>👤 ~{item.author}</small>}
                  {item.createdat && (
                    <small>
                      📅 {new Date(item.createdat).toLocaleString()}
                    </small>
                  )}
                </div>

                <p style={{ marginTop: "5px", width: "95%" }}>
                  {item.msg || item.reply}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No replies yet</p>
        )}
      </div>
    </div>
  );
};

export default Reply;
