import React, { useState } from "react";
import styled from "styled-components";
import Mint from "../components/Mint";

const WorkerStyle = styled.main`
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
        margin-top: 10px;
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
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState([]);

  const mint = () => {
    setLoading(!loading);
    document.body.style.overflow = "hidden";
    const num = Math.ceil(Math.random() * 100);
    setTimeout(() => {
      document.body.style.overflow = null
      if (num <= 70) setEstado([...estado, "worker ⭐"]);
      else if (num <= 80) setEstado([...estado, "worker ⭐⭐"]);
      else if (num <= 90) setEstado([...estado, "worker ⭐⭐⭐"]);
      else if (num <= 95) setEstado([...estado, "worker ⭐⭐⭐⭐"]);
      else setEstado([...estado, "worker ⭐⭐⭐⭐⭐"]);
    }, 2000);
  };

  return (
    <WorkerStyle>
      <div className="hubContainer">
        <div onClick={mint}>
          <p>Mint Worker</p>
          <img src="drop.svg" />
        </div>

        <div>
        <p>Current Workers</p>
        <p>{estado.length}</p>
        </div>

        <div>Mining Power</div>
      </div>
      <Mint estado={estado} />
    </WorkerStyle>
  );
};

export default Workers;
