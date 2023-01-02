import styled from "styled-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const SignUpStyle = styled.main`
  color: #fff;
  text-align: center;
  .backBtn {
    background-color: transparent;
    color: #FFF;
    border: none;
    padding: 5px 20px;
    font-size: 18px;
    border-radius: 100px 0 0 100px;
    transition: ease-in-out .25px;
    margin-bottom: 20px;
    &:hover {
      background-color: #FFF;
      color: #000;
      transform: translateX(-20px);
      animation: back infinite 1s;
    }
  }
  @keyframes back {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  input {
    padding: 3px;
  }
  button {
    margin-top: 20px;
    background-color: transparent;
    color: #FFF;
    border: none;
    padding: 5px 20px;
    font-size: 18px;
    border-radius: 0 100px 100px 0;
    transition: ease-in-out .25px;
    margin-bottom: 20px;
    &:hover {
      background-color: #FFF;
      color: #000;
      animation: next infinite 1s;
    }
  }
  @keyframes next {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  form {
    .formControl {
      .error {
        width: 200px;
        top: 0;
        left: 49.5%;
        position: absolute;
        padding: 10px;
        background-color: #444;
        z-index: 2;
      }
    }
  }
  @media (max-width: 720px) {
    padding-top: 90px;
    width: 100%;
    form {
      .formControl {
        .error {
          width: 50vw;
          left: 23%;
        }
      }
    }
  }
`;

const SingUp = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const db = getFirestore();

  const sign = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(auth.currentUser, { displayName: user });
      await addDoc(collection(db, "user"), {
        chez: 40,
        chezGet: 0,
        conveyance: [],
        fleets: [],
        userId: auth.currentUser.uid,
        workers: []
      });
      setEmail("");
      setPass("");
      setUser("");
      setMsg("Registro y acceso exitoso");
      setTimeout(() => {
        setMsg('')
      }, 2000)
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMsg("Email in use", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code === "auth/invalid-email") {
        setMsg("Invalid email", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code === "auth/weak-password") {
        setMsg("Passwore must have 5 or more digits", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code) {
        setMsg("Something went wrong", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      }
    }
  };

  return (
    <SignUpStyle>
    <Link to={'/'}>
    <button className="backBtn">Back</button>
    </Link>
      <h2>Sign Up</h2>
      <form>
        <div className="formControl">
          <p>Username:</p>
          <input
            value={user}
            type={"text"}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="formControl">
          <p>Email:</p>
          <input
            value={email}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formControl">
          <p>Password:</p>
          <input
            value={pass}
            type={"password"}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div className="formControl">
          <button onClick={sign}>Register</button>
          {
            msg === '' ? '' :
            <p className="error">{msg}</p>
          }
        </div>
      </form>
    </SignUpStyle>
  );
};

export default SingUp;
