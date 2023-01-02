import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import GetUser from "../hooks/getUser";
import Lateral from "./Lateral";

const HeaderStyle = styled.header`
  background-color: #1e2837;
  color: #fff;
  grid-area: header;
  position: fixed;
  width: 100%;
  z-index: 1;
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
      .fleetCreate {
        text-align: center;
        line-height: 1.8;
        color: #9ab;
        position: relative;
        .hide {
          display: none;
          padding: 5px;
          color: #fff;
          position: absolute;
          top: 3em;
          width: 140px;
          background-color: #37404f;
          border: solid 2px #fff;
          .fleets {
            &:hover {
              background-color: #73e;
            }
          }
        }
        .show {
          display: block;
        }
        .fleetBtn {
          color: #000;
          font-weight: 500;
          background-color: #e44;
          width: 150px;
          padding: 5px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 20px;
            margin-right: 10px;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
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
        padding: 10px 15px;
        color: #000;
        text-decoration: none;
        img {
          width: 15px;
          margin-right: 5px;
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
  @media (max-width: 765px) {
    nav {
      .game {
        .fleet {
          padding: 10px;
        }
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
          transition: ease-in-out 0.25s;
          &::after {
            content: "";
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
  @media (max-width: 500px) {
    nav {
      .game {
        .fleetCreate {
          position: absolute;
          bottom: -50px;
          left: 10px;
          .fleetBtn {
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { user, fleet, setFleet, actu } = useUserContext();

  const [userData, loading] = GetUser();
  const [cFleet, setCFleet] = useState("Select Fleet");
  const [bars, setBars] = useState(false);
  const [page, setPage] = useState("");
  const [show, setShow] = useState(false);

  const change = (elem) => {
    setFleet(userData.fleets.find((e) => e.name === elem.target.innerText));
    setCFleet(elem.target.innerText);
  };

  return (
    <>
      <HeaderStyle>
        <nav>
          <ul className="game">
            <img className="logo" src="logo.png" alt="logo" />
            <li className="barsContainer" onClick={() => setBars(!bars)}>
              <div className={bars ? "bars barsActive" : "bars"} />
            </li>
            <li>
            <div className="fleetCreate">
              {user.length !== 0 ? (
                
                  <div
                    onClick={() => setShow(!show)}
                    className="fleetBtn"
                    style={
                      cFleet !== "Select Fleet"
                        ? { backgroundColor: "#2ba" }
                        : {}
                    }
                  >
                    <div className="current">{cFleet}</div>
                    <div className={show ? "hide show" : "hide"}>
                      {fleet !== '' ? userData.fleets.map((e, i) => (
                        <div
                          onClick={(e) => change(e)}
                          className="fleets"
                          key={i}
                        >
                          {e.name}
                        </div>
                      )) : userData.fleets.map((e, i) => (
                        <div
                          onClick={(e) => change(e)}
                          className="fleets"
                          key={i}
                        >
                          {e.name}
                        </div>
                      ))}
                    </div>
                </div>
              ) : (
                <p className="fleetBtn">
                  <img src={"addUser.svg"} />
                  Create Fleet
                </p>
              )}
              </div>
            </li>
          </ul>
          <ul className="money">
            <li>$CHez</li>
            <li className={loading || userData.chezGet === 0 ? "" : "getChez"}>
              <span>Claim</span>{" "}
              {loading ? 0 : Number(userData.chezGet).toFixed(2)}{" "}
              <span>CHez</span>
            </li>
            <li>
              <img src="CHez.svg" alt="CHez" />{" "}
              {loading || user.lenght === 0 ? 0 : userData.chez} $CHez
            </li>
          </ul>
        </nav>
      </HeaderStyle>
      <Lateral lateral={bars} estado={page} setEstado={setPage} />
    </>
  );
};

export default Header;
