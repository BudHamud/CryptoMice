import styled from "styled-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const SignUpStyle = styled.main`
  color: #fff;
  text-align: center;
  input {
    padding: 3px;
  }
  button {
    margin-top: 10px;
    padding: 3px;
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
        userId: auth.currentUser.uid,
        saldo: 0,
        compra: [],
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
        setMsg("Email en uso", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code === "auth/invalid-email") {
        setMsg("Email inválido", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code === "auth/weak-password") {
        setMsg("Contraseña debe ser mayor a 5 dígitos", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      } else if (error.code) {
        setMsg("Algo salió mal", "error");
        setTimeout(() => {
          setMsg('')
        }, 2000)
      }
    }
  };

  return (
    <SignUpStyle>
      <h2>Registro</h2>
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
