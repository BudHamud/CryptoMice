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
    .exitBtn {
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
    }
  }
    .hubUser {
      display: flex;
      flex-wrap: wrap;
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
    .basics {
      margin: 30px auto;
      width: 600px;
      h3 {
        margin-bottom: 20px;
      }
      .resume {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        flex-wrap: wrap;
        span {
          margin: 0 20px;
        }
        img {
          width: 40px;
          filter: invert(86%) sepia(100%) saturate(0%) hue-rotate(293deg)
          brightness(107%) contrast(101%);
        }
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
      button {
        padding: 5px 20px;
        border: none;
        border-radius: 0 100px 100px 0;
        background-color: transparent;
        font-size: 18px;
        color: #FFF;

        &:hover {
          background-color: #FFF;
          color: #000;
        }
      }
    }
  }
  @media (max-width: 1020px) {
    .userProfile {
      .basics {
      margin: 30px auto;
      width: 100%;
    }
    }
  }
  @media (max-width: 765px) {
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
  const { user, setUser, setActu, setFleet } = useUserContext()

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
    setFleet('')
    setActu('')
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
            {
              user.length === 0 ? 'Cargando...' :
              <button className="exitBtn" onClick={exit}>Sign Out</button>
            }
          </div>
          <div className="hubUser">
          <Link to={`/expeditions`} onClick={() => setActu(1)}>Expeditions</Link>
          <Link to={`/workers`} onClick={() => setActu(2)}>Workers</Link>
          <Link to={`/conveyance`} onClick={() => setActu(3)}>Conveyance</Link>
          </div>

          <div className="basics">
          <h3>What is the game based on?</h3>
          <p>You have to build a fleet of mice in order to get cheese (CHez, the in-game currency). So to build a troop you need 'Workers' and 'Conveyance'. Once you get them you can build a fleet to take them on an expedition.</p>
          <p>This is a beta version, but in the future you will only be able to make one expedition per day PER FLEET.</p>
          <div className="resume">
          <img src="lateral/workers.svg" /> <span>+</span>
          <img src="lateral/conveyance.svg" /> <span>=</span>
          <img src="lateral/fleets.svg" /> <span>→</span>
          <img src="lateral/planet.svg" />
          </div>
          </div>
        </section>
      ) : (
        <>
          <h2>Access</h2>
          <form>
            <div className="formControl">
              <p>Email:</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
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
              {error === "" ? "" : <p className="error">{error}</p>}
              <button onClick={signIn}>Log In</button>
            </div>
          </form>
          <p style={{ marginTop: 20 }}>
            ¿Don't have an account? <Link to={"/signUp"}>Sign Up</Link>
          </p>
        </>
      )}
    </HomeStyle>
  );
};

export default Home;
