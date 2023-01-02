import styled from "styled-components";
import ReactCanvasConfetti from 'react-canvas-confetti';
import Confetti from 'react-confetti'
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import GetUser from "../hooks/getUser";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";

const CargandoStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 90%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: 450px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #123;
    .footer {
      display: flex;
      gap: 15px;
      margin-top: 10px;
      p {
        background-color: #112;
        padding: 10px;
        border-radius: 5px;
      }
    }
    img {
      width: 250px;
    }
    p:nth-child(3) {
      background-color: #23f49e;
      font-weight: 500;
      width: 65%;
      border-radius: 50px;
      text-align: center;
      padding: 10px;
      color: #000;
      margin-bottom: 10px;
    }
    p:nth-child(4) {
      font-size: 35px;
      display: flex;
      align-items: center;
      img {
        width: 45px;
        margin-right: 10px;
      }
    }
    button {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px 12px;
        margin: 10px;
        font-size: 18px;
        transition: ease-in-out .15s;
        background-color: transparent;
        border: none;
        color: #FFF;
        &:hover {
            background-color: #FFF;
            color: #000;
            border-radius: 50px;
        }
    }
  }
  @media (max-width: 720px) {
    .modal {
      height: 600px;
      width: 80%;
      .footer {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
  @media (max-width: 375px) {
    .modal {
      width: 95%;
    }
  }
`;

const Cargando = ({ estado, exit, mp, roll, CHez }) => {

  const [userData, loadUser] = GetUser()
  const {setActu} = useUserContext()
  const [repeat, setRepeat] = useState(true)
  const db = getFirestore()

  useEffect(() => {
    if (estado === 'pending') {
      setRepeat(true)
    }
  }, [])

  if (estado === 'success' && repeat === true) {
    
    const get = async () => {
      await updateDoc(doc(db, "user", userData.id), {
        // Chez: actual - total,
        chezGet: userData.chezGet + CHez,
      });
      console.log('get');
      setActu(CHez + Math.random())
    }
    get()
    setRepeat(false)
  }

  return (
    <CargandoStyle>
      {
        estado === 'pending'
        ? <div className="modal">Getting result...</div>
        : ''
      }
      {
        estado === 'success'
        ? 
        <div className="modal">
          <button onClick={exit}>X</button>
          <img src="/SUCCESS.png" />
          <p>Expedition Success</p>
          <p><img src="CHez.svg" /> {CHez}</p>
          <div className="footer">
          <p>🎲Your roll: {roll}</p>
          <p>🏆Needed: {mp} or below</p>
          </div>
          <Confetti
          width={550}
          height={450}
          opacity={0.1}
          />
        </div>
        : ''
      }
      {
        estado === 'failed'
        ?
        <div className="modal">
            <button onClick={exit}>X</button>
            <img src="/FAILED.png" />
            <p>Expedition Failed</p>
            <div className="footer">
            <p>🎲Your roll: {roll}</p>
            <p>🏆Needed: {mp} or below</p>
            </div>
        </div>
        : ''
      }
    </CargandoStyle>
  );
};

export default Cargando;
