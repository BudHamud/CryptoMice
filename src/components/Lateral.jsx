import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const LateralStyle = styled.nav`
  background-color: #1e2837;
  color: #fff;
  width: 200px;
  height: 94vh;
  grid-area: lateral;
  position: fixed;
  margin-top: 69px;
  overflow-y: scroll;
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
    background-color: #111;
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
  }
  @media (max-width: 720px) {
    position: fixed;
    width: 100%;
    display: none;
  }
`;

const Lateral = ({ lateral }) => {

  const path = window.location.pathname

  const [page, setPage] = useState("");

  useEffect(() => {
    setPage(path.slice(1, path.length));
  }, []);

  const values = ["spaceships", "workers", "fleets", "expeditions", "raids"];

  return (
    <LateralStyle style={lateral ? {display: 'block'} : {}}>
      <div className="navDiv">
        <h4>Main Game</h4>
        <p>Play To Earn</p>
      </div>
      <ul className="mainGame">
        <li
          className={page === values[0] ? "active" : ""}
          onClick={(e) => setPage(e.target.innerText.toLowerCase())}
        >
          <Link to={"/spaceships"}>spaceships</Link>
        </li>
        <li
          className={page === values[1] ? "active" : ""}
          onClick={(e) => setPage(e.target.innerText.toLowerCase())}
        >
          <Link to={"/workers"}>
            <img src="workers.svg" />
            workers
          </Link>
        </li>
        <li
          className={page === values[2] ? "active" : ""}
          onClick={(e) => setPage(e.target.innerText.toLowerCase())}
        ></li>
        <li
          className={page === values[3] ? "active" : ""}
          onClick={(e) => setPage(e.target.innerText.toLowerCase())}
        >
          <Link to={"/"}>
            <img src="planet.svg" />
            expeditions
          </Link>
        </li>
        <li
          className={page === values[4] ? "active" : ""}
          onClick={(e) => setPage(e.target.innerText.toLowerCase())}
        >
          <Link to={"/raids"}>raids</Link>
        </li>
      </ul>
      <div className="navDiv">
        <h4>Marketplace</h4>
        <p>Buy & Sell your NFTs</p>
      </div>
      <ul className="marketPlace">
        <li>
          <Link>Spaceships</Link>
        </li>
        <li>
          <Link>Workers</Link>
        </li>
        <li>
          <Link>Fleets</Link>
        </li>
      </ul>
    </LateralStyle>
  );
};

export default Lateral;
