import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import Lateral from "./Lateral";

const HeaderStyle = styled.header`
  background-color: #1e2837;
  color: #fff;
  grid-area: header;
  position: fixed;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    ul {
      .logo {
        width: 150px;
        margin-right: 10px;
      }
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      li {
        list-style: none;
      }
    }
    .game {
      .barsContainer {
        height: 25px;
        width: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fleet {
        display: flex;
        align-items: center;
        background-color: #e44;
        padding: 10px;
        color: #000;
        img {
          width: 15px;
          margin-right: 5px;
        }
        a {
          text-decoration: none;
          color: #000;
        }
      }
    }
    .money {
      li:nth-child(1) {
        background-color: #345;
        padding: 10px;
        font-size: 15px;
        border-radius: 5px;
        width: 50px;
        &:hover {
          cursor: pointer;
          font-weight: bold;
        }
      }
      li:nth-child(2) {
        padding: 10px;
        border-radius: 5px;
        background-color: #23f49e;
        opacity: 0.5;
        color: #000;
        font-size: 15px;
        font-weight: 700;
        opacity: 0.3;
        cursor: not-allowed;
      }
      .getChez {
        opacity: 1 !important;
        cursor: pointer !important;
      }
      li:nth-child(3) {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          margin-right: 5px;
        }
      }
    }
  }
  @media (max-width: 720px) {
    nav {
      .game {
        li {
          span {
            display: none;
          }
          img {
            margin: 0;
          }
        }
        .bars {
        display: block;
        background-color: #fff;
        width: 20px;
        height: 5px;
        padding: 0;
        border-radius: 20px;
        transition: ease-in-out .25s;
        &::after {
          content: '';
          width: 15px;
          height: 5px;
          background-color: #fff;
          position: absolute;
          transform: translateY(10px);
          border-radius: 20px;
        }
        }
        .barsActive {
          transform: rotate(45deg);
          &::after {
            transform: rotate(90deg) translateX(0px);
            width: 20px;
          }
        }
        .logo {
          display: none;
        }
        li {
          p {
            display: none;
          }
        }
      }
      .money {
        li {
          span {
            display: none;
          }
          img {
            display: none;
          }
        }
      }
    }
  }
`;

const Header = () => {

  const [bars, setBars] = useState(false)

  const { user } = useUserContext();

  return (
    <>
    <HeaderStyle>
      <nav>
        <ul className="game">
          <img className="logo" src="logo.png" alt="logo" />
          <li className="barsContainer" onClick={() => setBars(!bars)}>
          <div className={bars ? 'bars barsActive' : 'bars'} />
          </li>
          <li className="fleet">
            <img src="addUser.svg" />
            <Link to={"/createFleet"}>
            <span>Create Fleet</span></Link>
          </li>
        </ul>
        <ul className="money">
          <li>$CHez</li>
          <li className={user.chezGet === 0 ? '' : "getChez"}>
            <span>Claim</span> {user.chezGet} <span>CHez</span>
          </li>
          <li>
            <img src="CHez.svg" alt="CHez" /> {user.chez} $CHez
          </li>
        </ul>
      </nav>
    </HeaderStyle>
    <Lateral lateral={bars} />
    </>
  );
};

export default Header;
