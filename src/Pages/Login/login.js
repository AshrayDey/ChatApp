import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


export const Login = () => {
  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <header>
            <h1 >CHAT APP</h1>
            <h3>Login</h3>
          </header>
          <form onSubmit={handleSumbit}>
            <input type="text" placeholder="E-mail" />
            <input type="password" placeholder="Password" />

            <button>Login</button>
          </form>
          <p>
            Don't have an account? <Link to={"/sign-up"}>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};
