import React, { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import styles from "./signUp.module.scss";

//Firebase Imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(res.user, {
                    displayName: name,
                    photoURL: downloadURL,
                  });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name: name,
              email:email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db,"UserChat",res.user.uid),{})
           
          });
         
        }
      );
    } catch (error) {
      console.log(error);
      setErr(String(error));
    }
    navigate("/");
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <header>
            <h1>CHAT APP</h1>
            <h3>Register</h3>
          </header>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {err && <span>{err}</span>}
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <RiImageAddFill />
              <span>Add a profile pic</span>
            </label>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account?<Link to={"/"}>Login</Link> </p>
        </div>
      </div>
    </>
  );
};
