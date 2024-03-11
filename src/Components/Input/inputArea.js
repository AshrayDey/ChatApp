import React, { useState } from "react";

import { IoIosAttach } from "react-icons/io";
import { v4 as uuid } from "uuid";
import styles from "./inputArea.module.scss";
//Firebase imports
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//Context imports
import { useChat } from "../../Context/chatContext";
import { useAuth } from "../../Context/authContext";

export const InputArea = () => {
  const { user } = useAuth();
  const { data } = useChat();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                image: downloadURL,
                senderId: user.uid,
                date: Timestamp.now(),
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "UserChat", user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".Date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };
  return (
    <div className={styles.inputArea}>
      <input
        className={styles.input}
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className={styles.send}>
        {/* <img src="" alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <IoIosAttach />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
