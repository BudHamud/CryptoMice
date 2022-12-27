import React from "react";
import styled from "styled-components";
import Planets from "../components/Planets";

export const MainStyle = styled.main`
  padding: 20px;
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #111;
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
        border-radius: 10px;
      }
      .planet {
        background-color: #73e;
        font-weight: 500;
        padding: 10px;
        border-radius: 10px;
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
    .planetsContainer {
      justify-content: center;
      display: flex;
      flex-direction: column;
      .planetCard {
        width: 85%;
      }
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Home = () => {

  const mp = 100

  return (
    <MainStyle>
      <section className="cardContainer">
        <div className="card">
          <h4>Current power</h4>
          <p className="mp">{mp} MP</p>
          <p>Based on your mine power available right now.</p>
        </div>

        <div className="card">
          <h4>Max planet</h4>
          <p className="planet">Planet {mp / 100 }</p>
          <p>Based on workers that can enter the mine right now.</p>
        </div>
      </section>

      <Planets />
    </MainStyle>
  );
};

export default Home;
