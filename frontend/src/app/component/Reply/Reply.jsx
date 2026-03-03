"use client";
import React from "react";
import styles from "./reply.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Reply = ({ msgid }) => {
  let [reply, setreply] = useState([]);

  useEffect(() => {
    async function fetch() {
      let resp = await axios.get(`${process.env.NEXT_PUBLIC_URL}/reply`, {
        params: {
          msgid,
        },
      });
      console.log(resp.data);
      setreply((prev) => [...prev, resp.data.replies]);
    }
    fetch();
  }, []);

  useEffect(() => {
    console.log(reply);
  }, [reply]);

  return (
    <div style={{ padding: "10px" }} className={`${styles.reply}`}>
      {reply && reply.length > 0 ? (
        <div>
          {reply.map((replyItem, index) => (
            <div
              key={index}
              style={{
                paddingBottom: "10px",
              }}
            >
              {Array.isArray(replyItem) ? (
                replyItem.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: "15px",
                      borderBottom: "1px solid #e0e0e0",
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                      }}
                    >
                      {item.author && (
                        <p>
                          <small>👤 ~{item.author}</small>
                        </p>
                      )}
                      {item.createdat && (
                        <p>
                          <small>
                            📅 {new Date(item.createdat).toLocaleString()}
                          </small>
                        </p>
                      )}
                    </div>
                    <p style={{ width: "95%" }}>
                      {console.log(item)}
                      {item.msg}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p>
                    <strong>Reply:</strong>{" "}
                    {replyItem.msg ||
                      replyItem.reply ||
                      JSON.stringify(replyItem)}
                  </p>
                  {replyItem.author && (
                    <p>
                      <small>👤 By: {replyItem.author}</small>
                    </p>
                  )}
                  {replyItem.createdat && (
                    <p>
                      <small>
                        📅 {new Date(replyItem.createdat).toLocaleString()}
                      </small>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No replies yet</p>
      )}
    </div>
  );
};

export default Reply;
