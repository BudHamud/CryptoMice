import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GetUser from "../hooks/getUser";

const FleetStyle = styled.main`
  .hubContainer {
    margin: 20px;
    color: #fff;
    width: 95%;
    display: flex;
    margin: 20px auto;
    gap: 70px;
    div {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      background-color: #1d2633;
      opacity: 1;
      padding: 20px;
      height: 50px;
      a {
        padding: 7px;
        background-color: #2fa;
        text-decoration: none;
        color: #000;
        border-radius: 10px;
        font-weight: 500;
      }
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
  .fleetContainer {
    padding: 0 45px;
    display: flex;
    gap: 20px;
    text-align: center;
    flex-wrap: wrap;
    .fleetCard {
      width: 200px;
      background-color: #234;
      color: #fff;
      position: relative;
      border-radius: 20px;
      img {
        width: 90%;
        border-radius: 20px;
      }
      .extra {
        position: absolute;
        bottom: 100px;
        padding: 5px;
        text-align: left;
        background-color: #932;
      }
      .hidden {
        display: none;
        position: absolute;
        width: 100%;
        height: 100.4%;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 20px;
        button {
          padding: 3px 0px;
          background-color: transparent;
          border: none;
          border-radius: 10px;
          width: 90%;
          background-color: #2fa;
          font-weight: 500;
        }
      }
      &:hover .hidden {
        display: flex;
      }
    }
  }
  @media (max-width: 1020px) {
    .hubContainer {
      flex-direction: column;
      gap: 10px;
    }
    .fleetContainer {
      .fleetCard {
        width: 150px;
      }
    }
  }
  @media (max-width: 720px) {
    padding-top: 70px;
    width: 100%;
  }
`;

const Fleets = () => {
  const [fleets, setFleets] = useState(0);
  const [userData, loadUser] = GetUser();

  useEffect(() => {
    if (!loadUser) {
      let num = 0;
      userData.fleets.map((e) => {
        num += 1;
      });
      setFleets(num);
    }
  }, [userData]);

  return (
    <FleetStyle>
      <section className="hubContainer">
        <div>
          <Link to={'/createFleet'}>Create Fleet</Link>
        </div>

        <div>
          <p>Current Fleets</p>
          <p>{!loadUser ? userData.fleets.length : 0}</p>
        </div>

        <div>
          <p>Expeditions</p>
          <p>{fleets} / {fleets}</p>
        </div>
      </section>
      <section className="fleetContainer">
        {!loadUser
          ? userData.fleets.map((e, i) => (
              <div key={i} className="fleetCard">
                <p>{e.name}</p>
                <div className="extra">
                  <p>
                    Workers {e.fleetArr.length} / {e.fleetArr.length}
                  </p>
                  <p>Rank D</p>
                </div>
                <div className="hidden">
                  <button>Delete</button>
                </div>
                <img src="fleet/fleet1.jpg" />
                <p>{e.mp} MP</p>
              </div>
            ))
          : "Cargando..."}
      </section>
    </FleetStyle>
  );
};

export default Fleets;
