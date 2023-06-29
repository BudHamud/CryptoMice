import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const LateralStyle = styled.nav`
  background-color: #1e2837;
  color: #fff;
  width: 200px;
  height: 94vh;
  grid-area: lateral;
  position: fixed;
  margin-top: 69px;
  overflow-y: scroll;
  z-index: 2;
  .active {
    background-color: #3930ab;
    img {
      opacity: 1;
      filter: invert(86%) sepia(100%) saturate(0%) hue-rotate(293deg)
        brightness(107%) contrast(101%);
    }
  }
  &::-webkit-scrollbar {
    background-color: #1e2837;
    width: 7px;
  }
  .navDiv {
    background-color: #18202f;
    border-radius: 5px;
    padding: 5px;
    margin: 10px 2px 10px 10px;
    h4 {
      color: #6366f1;
    }
    p {
      font-weight: 300;
    }
  }
  ul {
    text-transform: uppercase;
    font-size: 15px;
    li {
      list-style: none;
      a {
        text-decoration: none;
        color: #fff;
        padding: 10px;
        margin: 5px 0;
        display: flex;
        align-items: center;
        font-size: 15px;
        &:hover {
          background-color: #3930ab;
          cursor: pointer;
        }
      }
      img {
        width: 20px;
        margin-right: 15px;
        margin-bottom: 2.5px;
        filter: invert(86%) sepia(100%) saturate(0%) hue-rotate(293deg)
          brightness(107%) contrast(101%);
        opacity: 0.5;
      }
    }
    .social {
      display: flex;
      justify-content: center;
      gap: 10px;
      li {
        :hover img {
          opacity: 1;
        }
        a {
          margin: 0;
          img {
            margin: 0;
            transition: ease-in-out .2s;
          }
        }
      }
    }
  }
  @media (max-width: 765px) {
    position: fixed;
    width: 100%;
    display: none;
  }
`;

const Lateral = ({ lateral, estado, setEstado }) => {
  const path = window.location.pathname;
  const { actu, setActu } = useUserContext();

  useEffect(() => {
    if (path === "/") {
      setEstado("home");
    } else {
      setEstado(path.slice(1, path.length));
    }
  }, [actu]);

  const values = [
    "conveyance",
    "workers",
    "fleets",
    "expeditions",
    "raids",
    "fleets",
    "home",
    "market/conveyance",
    "market/workers",
    "market/fleets",
  ];

  return (
    <LateralStyle style={lateral ? { display: "block" } : {}}>
      <div className="navDiv">
        <h4>Welcome</h4>
        <p>to CryptoMice</p>
      </div>
      <ul className="userTab">
        <li
          className={estado === values[6] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/"}>
            <img src="/lateral/home.svg" />
            home
          </Link>
        </li>
      </ul>
      <div className="navDiv">
        <h4>Main Game</h4>
        <p>Play To Earn</p>
      </div>
      <ul className="mainGame">
        <li
          className={estado === values[0] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/conveyance"}>
            <img src="/lateral/conveyance.svg" />
            conveyance
          </Link>
        </li>
        <li
          className={estado === values[1] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/workers"}>
            <img src="/lateral/workers.svg" />
            workers
          </Link>
        </li>
        <li
          className={estado === values[5] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/fleets"}>
            <img src="/lateral/fleets.svg" />
            fleets
          </Link>
        </li>
        <li
          className={estado === values[2] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        ></li>
        <li
          className={estado === values[3] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/expeditions"}>
            <img src="/lateral/planet.svg" />
            expeditions
          </Link>
        </li>
        <li
          className={estado === values[4] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/raids"}>
            <img src="/lateral/raids.svg" />
            raids
          </Link>
        </li>
      </ul>
      <div className="navDiv">
        <h4>Marketplace</h4>
        <p>Buy & Sell your NFTs</p>
      </div>
      <ul className="marketPlace">
        <li
          className={estado === values[7] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"/market/conveyance"}>
            <img src="/lateral/cart.svg" />
            Conveyance
          </Link>
        </li>
        <li
          className={estado === values[8] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"market/workers"}>
            <img src="/lateral/cart.svg" />
            Workers
          </Link>
        </li>
        <li
          className={estado === values[9] ? "active" : ""}
          onClick={() => setActu(Math.random())}
        >
          <Link to={"market/fleets"}>
            <img src="/lateral/cart.svg" />
            Fleets
          </Link>
        </li>
        <div className="navDiv">
          <h4>Social Media</h4>
          <p>Contact with me</p>
        </div>
        <ul className="social">
          <li><a href="https://github.com/BudHamud"><img src="/social/github.svg" /></a></li>
          <li><a href="https://www.linkedin.com/in/adrielcamacho/"><img src="/social/linkedin.svg" /></a></li>
          <li><a href="https://twitter.com/AdrielCamacho"><img src="/social/twitter.svg" /></a></li>
        </ul>
      </ul>
    </LateralStyle>
  );
};

export default Lateral;
