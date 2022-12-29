import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Planets from "../components/Planets";
import { useUserContext } from "../context/UserContext";

export const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  .cardContainer {
    display: flex;
    gap: 20px;
    .card {
      border: solid 2px #374050;
      background-color: #123;
      width: 94%;
      height: 150px;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      h4 {
        letter-spacing: 1.3px;
      }
      .mp {
        background-color: #d27;
        font-weight: 500;
        padding: 10px;
        border-radius: 5px;
      }
      .planet {
        background-color: #73e;
        font-weight: 500;
        padding: 10px;
        border-radius: 10px;
      }
    }
  }
  .fleetCreate {
    width: 50%;
    padding: 15px;
    background-color: #1f2937;
    border-radius: 10px;
    margin: 30px auto 0 auto;
    text-align: center;
    line-height: 1.8;
    border-left: solid 5px #e22;
    color: #9ab;
    .fleetBtn {
      color: #000;
      font-weight: 500;
      background-color: #e44;
      width: 450px;
      margin: 20px auto 20px auto;
      padding: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        margin-right: 10px;
      }
    }
  }
  .planetsContainer {
    display: grid;
    width: 85%;
    margin: 0 auto;
    .planetCard {
      border-radius: 2px;
      margin-top: 30px;
      background-color: #374050;
      width: 30vw;
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 20px;
      &:nth-child(2n + 2) {
        justify-self: flex-end;
      }
      h3 {
        font-size: 28px;
        font-weight: 400;
        margin-bottom: 40px;
      }
      .getBtn {
        padding: 5px;
        border-radius: 5px;
        border: none;
        font-size: 17px;
        margin: 10px auto 0 auto;
        transition: ease-in-out 0.25s;
        background-color: transparent;
        color: #fff;
        &:hover {
          background-color: #111827;
        }
      }
      .divider {
        display: flex;
        width: 100%;
        justify-content: space-between;
        span {
          font-size: 30px;
          font-weight: 500;
          margin-right: 5px;
        }
      }
      .imgPlanet {
        /* background: linear-gradient(#222, #444); */
        background-color: #1e2837;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        margin: 20px 0;
        img {
          height: 200px;
        }
      }
      .main {
        text-align: center;
        background-color: #1e2837;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 15px;
        span {
          font-size: 30px;
          font-weight: 500;
          margin-right: 5px;
          padding: 5px;
          border-radius: 10px;
        }
        p {
          margin: 0 5px;
        }
      }
    }
  }
  @media (max-width: 1170px) {
    .fleetCreate {
      .fleetBtn {
        color: #000;
        font-weight: 500;
        background-color: #e44;
        width: 80%;
      }
    }
    .planetsContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .planetCard {
        width: 85%;
      }
    }
  }
  @media (max-width: 720px) {
    width: 100%;
    flex-direction: column;
    padding-top: 100px;
    .cardContainer {
      align-items: center;
      flex-direction: column;
      .card {
        width: 90%;
        img {
          width: 10%;
        }
      }
    }
    .fleetCreate {
      width: 90%;
    }
  }
  @media (max-width: 500px) {
    .planetsContainer {
      h3 {
        margin-bottom: 0px !important
      }
      .planetCard {
        width: 95%;
        .divider {
          display: none;
        }
        .imgPlanet {
          img {
            max-width: 100%;
          }
        }
      }
    }
  }
`;

const Home = () => {
  const { user } = useUserContext();

  return (
    <MainStyle>
      <section className="cardContainer">
        <div className="card">
          <h4>Current power</h4>
          <p className="mp">{user.mp} MP</p>
          <p>Based on your mine power available right now.</p>
        </div>

        <div className="card">
          <h4>Max planet</h4>
          <p className="planet">Planet {Math.floor(user.mp / 100)}</p>
          <p>Based on workers that can enter the mine right now.</p>
        </div>
      </section>
      <div className="fleetCreate">
        <p>Please select a Fleet before initializing an Expedition</p>
        <p className="fleetBtn">
          <img src={"addUser.svg"} />
          Create Fleet
        </p>
        <p>Fleets can be found on the top left area.</p>
      </div>

      <Planets />
    </MainStyle>
  );
};

export default Home;
