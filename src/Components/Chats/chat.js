import React, { useEffect, useState } from "react";
import styles from "./chats.module.scss";
import { useAuth } from "../../Context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useChat } from "../../Context/chatContext";

export const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    let unsub;

    const getChats = () => {
      if (user.uid) {
        unsub = onSnapshot(doc(db, "UserChat", user.uid), (doc) => {
          setChats(doc.data());
        });
      }
    };

    getChats();
    return () => {
      unsub && unsub();
    };
  }, [user.uid]);

  const handleSelect = (friend) => {
    dispatch({ type: "CHANGE_USER", payload: friend });
  };
  console.log(Object.entries(chats));
  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, index) => (
          <div
            className={styles.chatContainer}
            key={index}
            onClick={() => handleSelect(chat[1].friendInfo)}
          >
            <img src={chat[1].friendInfo.photoURL} alt="pic" />
            <div className={styles.chatInfo}>
              <span>{chat[1].friendInfo.name}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </>
  );
};
