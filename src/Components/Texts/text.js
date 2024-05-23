import React, { useEffect, useRef, useState } from "react";
import styles from "./text.module.scss";

import { useAuth } from "../../Context/authContext";
import { useChat } from "../../Context/chatContext";

export const Text = ({ text }) => {
  const { user } = useAuth();
  const [sender, setSender] = useState("friend");
  const { data } = useChat();

  const ref = useRef(null);
  useEffect(() => {
    if (text.senderId === user.uid) {
      setSender("owner");
    }
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [text,user.uid]);

  return (
    <>
      <div ref={ref} className={`${styles[sender]}`}>
        <div className={styles.messageInfo}>
          <img
            src={sender === "friend" ? data.user.photoURL : user.photoURL}
            alt="bleh"
            className={styles.dp}
          />
          <span>Just Now</span>
        </div>
        <div className={styles.messageContent}>
          {text.text ? <p>{text.text}</p> : null}
          {text.image ? <img src={text.image} alt="" /> : null}
        </div>
      </div>
    </>
  );
};
