import React from "react";
import styles from "./chatPage.module.scss";
import { Sidebar } from "../../Components/Sidebar/sidebar";
import { ChatSection } from "../../Components/ChatSection/ChatSection";
export const ChatPage = () => {
  return (
    <>
      <div className={styles.container}>
      
          <Sidebar className={styles.sidebar} />
          <ChatSection className={styles.chatSection}/>
       
      </div>
    </>
  );
};
