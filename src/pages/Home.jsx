import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import GetUser from "../hooks/getUser";

const HomeStyle = styled.main`
  color: #fff;
  text-align: center;
  .userProfile {
    .hubUser {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
      a {
        padding: 15px;
        background-color: #234;
        color: #FFF;
        text-decoration: none;
      }
    }
  }
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

const Home = () => {
  const [a, b, setUserData] = GetUser()
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { user, setUser, setActu } = useUserContext()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser([]);
    });
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success(`Acceso exitoso`);
      setError("");
      setActu(auth)
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta", "error");
          setTimeout(() => {
            setError('')
          }, 2000)
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado", "error");
          setTimeout(() => {
            setError('')
          }, 2000)
      } else {
        setError("Algo salió mal", "error");
          setTimeout(() => {
            setError('')
          }, 2000)
      }
    }
  };

  const exit = (e) => {
    e.preventDefault();
    auth.signOut();
    setUser([]);
    setUserData([{chez: 0, chezGet: 0}])
    toast(`Hasta luego.`);
  };

  function userName() {
    return new Promise((resolve) => {
      if (auth.currentUser != null) {
        resolve(auth.currentUser);
      }
    });
  }

  return (
    <HomeStyle>
      {user.length != 0 ? (
        <section className="userProfile">
          <img
          style={{width: 100}}
            src={user.photoURL ? user.photoURL : "/CHez.svg"}
            alt="foto de perfil"
          />
          <div className="infoProfile">
            <p>Welcome, {user.displayName}</p>
            <button onClick={exit}>Cerrar Sesión</button>
          </div>
          <div className="hubUser">
          <Link to={`/expeditions`}>Expeditions</Link>
          <Link to={`/expeditions`}>Workers</Link>
          <Link to={`/expeditions`}>Conveyance</Link>
          </div>
        </section>
      ) : (
        <>
          <h2>Acceso</h2>
          <form>
            <div className="formControl">
              <p>Email:</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="formControl">
              <p>Contraseña:</p>
              <input
                value={pass}
                type={"password"}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <div className="formControl">
              {error === "" ? "" : <p className="error">{error}</p>}
              <button onClick={signIn}>Ingresar</button>
            </div>
          </form>
          <p style={{ marginTop: 20 }}>
            ¿No tenés cuenta? <Link to={"/signUp"}>Crear cuenta</Link>
          </p>
        </>
      )}
    </HomeStyle>
  );
};

export default Home;
