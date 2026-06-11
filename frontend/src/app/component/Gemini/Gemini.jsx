"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./gemini.module.css";
import Image from "next/image";

const Gemini = ({ onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:4000";

  const askGemini = async (event) => {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      toast.error("Please type a question for Gemini.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/airesponse`, {
         prompt: trimmedPrompt },
          {
            withCredentials: true,
    });

      if (res.data.success) {
        const answer = res.data.msg || "No response returned.";
        setHistory((prev) => [ ...prev,{ prompt: trimmedPrompt, answer }]);
        setPrompt("");
      } else {
        setError(res.data.message || "Gemini returned an error.");
        toast.error(res.data.message || "Failed to get Gemini response.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Network error.";
      setError(message);
      toast.error(`Gemini request failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.aiplace}>
      <div className={styles.aiPanel}>
        <div className={styles.aiHeader}>
          <div className={styles.headerTop}>
            <h3> <Image src={'/gemini.jpg'}
            height={10}
            width={30}
            alt="jkl"
            style={{display:"inline"}}
            >
              
              </Image> Gemini AI</h3>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close Gemini"
            >
              ✕
            </button>
          </div>
          <p>Ask a question and get a smart reply.</p>
        </div>

        <div className={styles.history}>
          {history.length === 0 ? (
            <div className={styles.emptyState}>No Gemini questions yet.</div>
          ) : (
            history.map((item, index) => (
              <div key={index} className={styles.historyItem}>
                <div className={styles.historyPrompt}>
                  <strong>You:</strong> {item.prompt}
                </div>
                <div className={styles.historyAnswer}>
                  <strong>Gemini:</strong> {item.answer}
                </div>
              </div>
            ))
          )}
        </div>
        {error && <div className={styles.errorText}>{error}</div>}
        <form className={styles.aiForm} onSubmit={askGemini}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question for Gemini..."
            className={styles.aiTextarea}
            rows={4}
          />
          <button type="submit" className={styles.aiButton} disabled={loading}>
            {loading ? "Thinking..." : "Ask Gemini"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gemini;
