import React, { useState } from "react";
import styles from "./sidebar.module.scss";

import Dp from "../../Assets/Dp2.jpg";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useAuth } from "../../Context/authContext";
import { Chats } from "../Chats/chat";

export const Sidebar = () => {
  const { user } = useAuth();

  const [username, setUsername] = useState("");
  const [friend, setFriend] = useState(null);
  const [error, setError] = useState("");

  const friendPhoto = friend?.photoURL || Dp;
  
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", username));
    console.log("Searching for:", username);
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFriend(doc.data());
        console.log("Friend data:", friend);
      });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    console.log("User ", user);
    //combining the IDs of a chat between two individuals
    const combinedId =
      user.uid > friend.uid ? user.uid + friend.uid : friend.uid + user.uid;

      console.log("combinedId ", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      //If chat does not exist then create one or fetch it
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "UserChat", user.uid), {
          [combinedId + ".friendInfo"]: {
            uid: friend.uid,
            name: friend.name,
            photoURL: friend.photoURL,
          },
          [combinedId + ".Date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "UserChat", friend.uid), {
          [combinedId + ".friendInfo"]: {
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".Date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log("error");
    }
    setUsername("");
    setFriend(null);
  };
 

  return (
    <div className={styles.container}>
      <header>
        <span className={styles.logo}>Chat App</span>
        <div className={styles.user}>
          <img src={user.photoURL} alt="DP" />
          <span> {user.displayName} </span>
          <button onClick={() => signOut(auth)}>Log out</button>
        </div>
      </header>

      <div className={styles.searchBar}>
        <div className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search a friend"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {error && <span>User Not Found</span>}
        {friend && (
          <div className={styles.chatContainer} onClick={handleSelect}>
            <img src={friendPhoto} alt="" />
            <div className={styles.chatInfo}>
              {friend ? (
                <>
                  <span>{friend.name}</span>
                  {/* <p>Chats to be displayed</p> */}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Chats />
    </div>
  );
};
