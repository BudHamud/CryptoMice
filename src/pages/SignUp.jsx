import styled from "styled-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Modal from "../components/Modal";
import { useUserContext } from "../context/UserContext";

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
  const {user, setActu} = useUserContext()

  const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const db = getFirestore();

  const sign = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(auth.currentUser, { displayName: userName });
      await addDoc(collection(db, "user"), {
        chez: 40,
        chezGet: 0,
        conveyance: [],
        fleets: [],
        userId: auth.currentUser.uid,
        workers: []
      });
      setActu('new')
      setColor('green')
      setMsg("Register and login successful");
      setEmail("");
      setPass("");
      setUser("");
      setTimeout(() => {
        setMsg('')
      }, 2000)
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMsg("Email in use", "error");
        setColor('red')
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code === "auth/invalid-email") {
        setMsg("Invalid email", "error");
        setColor('red')
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code === "auth/weak-password") {
        setMsg("Passwore must have 5 or more digits", "error");
        setColor('red')
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code) {
        setMsg("Something went wrong", "error");
        setColor('red')
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
      {auth.currentUser === null ? <h2>Sign Up</h2> : <h2>Welcome {auth.currentUser.displayName}</h2>}
      {
        auth.currentUser === null ?
        <form>
        <div className="formControl">
          <p>Username:</p>
          <input
            value={userName}
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
        </div>
      </form> : 'You already logged in, come back.'
      }
      {
        msg !== '' ?
          <Modal msg={msg} color={color} />
         : ''
      }
    </SignUpStyle>
  );
};

export default SingUp;
