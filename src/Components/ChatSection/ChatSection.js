import React from "react";

import { IoMdPersonAdd, IoMdVideocam } from "react-icons/io";
import styles from "./chatSection.module.scss";

import { useChat } from "../../Context/chatContext";
import { InputArea } from "../Input/inputArea";
import { TextsArea } from "../TextsArea/textsArea";

export const ChatSection = () => {
  const { data } = useChat();

  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.chatInfo}>
        <div className={styles.recipient}>
          <img src={data.user.photoURL} alt="" />
          <span>{data.user.name}</span>
        </div>

        <div className={styles.chatIcons}>
          <IoMdPersonAdd />
          <IoMdVideocam />
        </div>
      </div>
      <div className={styles.messagesArea}>
        <TextsArea />
      </div>

      <div>
        <InputArea />
      </div>
    </div>
  );
};
