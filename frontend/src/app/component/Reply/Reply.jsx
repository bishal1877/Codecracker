"use client";
import { useEffect, useState ,useContext} from "react";
import LoadingBar from "react-top-loading-bar";
import styles from "./reply.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../Context/Context";

const Reply = ({ msgid, reply, setreply }) => {
  const [progress, setProgress] = useState(0);
  let pk = useContext(Context);
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setProgress(30);
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_URL}/reply`, {
          params: { msgid },
          withCredentials: true,
        });

        setProgress(70);

        if (resp.data.success) {
          setreply((prev) => [...prev, ...resp.data.replies]);
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

  return (
    <div style={{ padding: "10px" }} className={styles.reply}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={styles.replyinner}>
        {reply && reply.length > 0 ? (
          <div>
            {console.log(window.location)}
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
                {item.msg.substring(0, 39) ==
                "Click here to join the call with callid" ? (                  
                  <a href={`${window.location.origin}/call?callid${item.msg.substring(39,item.msg.length)}&userid=${pk.state.userid}&username=${pk.state.name}`} >
                    <p style={{ marginTop: "5px", width: "95%" }}>{item.msg}</p>
                  </a>
) : (
                  <p style={{ marginTop: "5px", width: "95%" }}>{item.msg}</p>
                )}
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
