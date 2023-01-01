import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Mint from "../components/Mint";
import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import getUser from "../hooks/getUser";
import { useUserContext } from "../context/UserContext";

export const WorkerStyle = styled.main`
  .hubContainer {
    margin: 20px;
    color: #fff;
    width: 95%;
    display: flex;
    margin: 20px auto;
    gap: 70px;
    div {
      text-align: center;
      flex-grow: 1;
      background-color: #1d2633;
      opacity: 1;
      padding: 20px;
      img {
        width: 25px;
        filter: invert(86%) sepia(100%) saturate(0%) hue-rotate(293deg)
          brightness(107%) contrast(101%);
        &:hover {
          scale: 1.1;
        }
      }
    }
  }
  @media (max-width: 1020px) {
    .hubContainer {
      flex-direction: column;
      gap: 10px;
    }
  }
  @media (max-width: 720px) {
    padding-top: 70px;
    width: 100%;
  }
`;

const Workers = () => {
  const [estado, setEstado] = useState([]);
  const [mp, setMp] = useState(0);

  const [userData, loadUser] = getUser();
  const { user, setActu } = useUserContext();

  useEffect(() => {
    if (!loadUser) {
      let num = 0;
      userData.workers.map((e) => {
        num += e.mp;
      });
      setMp(num);
    }
  }, [userData]);

  const db = getFirestore();

  const mint = async () => {
    if (userData.chez >= 5) {
      const num = Math.ceil(Math.random() * 100);
      const mpnum = Math.ceil(Math.random() * 50);
      if (num <= 44) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          workers: arrayUnion({
            name: "Common",
            num: 1,
            mp: mpnum,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 0.1,
        });
        setActu(mpnum);
      } else if (num <= 79) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          workers: arrayUnion({
            name: "Hacker",
            num: 2,
            mp: mpnum + 50,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 0.1,
        });
        setActu(mpnum);
      } else if (num <= 94) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          workers: arrayUnion({
            name: "Magic",
            num: 3,
            mp: mpnum + 100,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 0.1,
        });
        setActu(mpnum);
      } else if (num <= 98) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          workers: arrayUnion({
            name: "Stripper",
            num: 4,
            mp: mpnum + 150,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 0.1,
        });
        setActu(mpnum);
      } else {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          workers: arrayUnion({
            name: "Dorime",
            num: 5,
            mp: mpnum + 200,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 0.1,
        });
        setActu(mpnum);
      }
    } else {
      console.log('Sin Fondos');
    }
  };

  return (
    <WorkerStyle>
      <div className="hubContainer">
        <div>
          <p>Mint Worker</p>
          <img onClick={mint} src="drop.svg" />
        </div>

        <div>
          <p>Current Workers</p>
          <p>{!loadUser ? userData.workers.length : 0}</p>
        </div>

        <div>
          <p>Mining Power</p>
          <p>{mp}</p>
        </div>
      </div>
      {!loadUser ? (
        <Mint estado={userData.workers} />
      ) : (
        <p
          style={{
            color: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </p>
      )}
    </WorkerStyle>
  );
};

export default Workers;
