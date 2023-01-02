import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GetUser from "../hooks/getUser";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

const CreateStyle = styled.main`
  color: #fff;
  .backBtn {
    background-color: transparent;
    color: #FFF;
    border: none;
    padding: 5px 20px;
    font-size: 18px;
    border-radius: 100px 0 0 100px;
    transition: ease-in-out .25px;
    margin-bottom: 20px;
    &:hover {
      background-color: #FFF;
      color: #000;
    }
  }
  .createContainer {
    display: flex;
    flex-direction: column;
    background-color: #123;
    padding: 20px;
    border-radius: 10px;
    min-height: 240px;
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
      button {
        border: solid 2px transparent;
        background-color: transparent;
        color: #fff;
      }
      .active {
        border-bottom: solid 2px #f00;
      }
    }
    .cardContainer {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
      gap: 20px;
      .createCard {
        width: 100px;
        background-color: #234;
        border-radius: 10px;
        img {
          width: 100px;
        }
      }
    }
  }
  .fleetContainer {
    gap: 20px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    min-height: 240px;
    border-radius: 10px;
    background-color: #123;
    .currentStatus {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      .current {
        display: flex;
        background-color: #012;
        padding: 6px;
        border-radius: 20px;
        img {
          width: 25px;
          margin-right: 5px;
          filter: invert(86%) sepia(100%) saturate(0%) hue-rotate(293deg)
            brightness(107%) contrast(101%);
        }
      }
      button {
        border: none;
        background-color: transparent;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        font-size: 15px;
        &:hover {
          background-color: #fff;
          color: #000;
        }
      }
    }
    .fleetCard {
      width: 100px;
      background-color: #234;
      border-radius: 10px;
      text-align: center;
      img {
        width: 100px;
      }
    }
  }
`;

const CreateFleet = () => {
  const [user, loadUser] = GetUser();
  const [active, setActive] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [conveyance, setConveyance] = useState([]);
  const [fleet, setFleet] = useState([]);
  const [aux, setAux] = useState([]);
  const [CW, setCW] = useState(0); // MP Total
  const [CS, setCS] = useState(0); // Space Total / Worker Cap
  const [CWS, setCWS] = useState(0); // Current Worker Status 
  const [CSS, setCSS] = useState(0); // Current Space Status
  const [rank, setRank] = useState(0); // Fleet Rank
  const [fleetName, setFleetName] = useState("");
  const [msg, setMsj] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    if (!loadUser) {
      setWorkers(user.workers);
      setConveyance(user.conveyance);
    }
  }, [user]);

  useEffect(() => {
    if (fleet.length != 0) {
      let num = 0;
      let nCWS = 0;
      let nCSS = 0;
      let space = 0;
      let numRank = 0
      fleet.map((e) => {
        //includes
        if (e.mp) {
          num += e.mp;
          nCWS += 1;
        } else {
          space += e.num;
          nCSS += 1;
        }
        numRank += e.num
      });
      setCW(num);
      setCWS(nCWS);
      setCSS(nCSS);
      setCS(space);
      setRank(Math.floor(numRank / (nCSS + nCWS)))
    } else {
      setCW(0);
      setCWS(0);
      setCSS(0);
      setCS(0);
    }
  }, [fleet]);

  console.log(rank);

  const addFleet = (e) => {
    if (CS > CWS) { 
      const elem = workers.indexOf(e);
      setWorkers(workers.filter((e) => e !== workers[elem]));
      setFleet([...fleet, e]);
    } else {
      setMsj('Not enought space, add conveyance');
      setColor('red')
      setTimeout(() => {
        setMsj('');
      }, 2000)
    }
  };

  const addCFleet = (e) => {
    if (CSS < 10) {
      const elem = workers.indexOf(e);
      setWorkers(workers.filter((e) => e !== workers[elem]));
      setFleet([...fleet, e]);
    } else {
      setMsj('Limit exceded');
      setColor('red')
      setTimeout(() => {
        setMsj('');
      }, 2000)
    }
  };

  const addWorkers = (e) => {
    const elem = fleet.indexOf(e);
    setFleet(fleet.filter((e) => e !== fleet[elem]));
    setWorkers([...workers, e]);
  };

  const toWork = () => {
    if (active === true) {
      setActive(false);
      setAux(workers);
      setWorkers(conveyance);
    }
  };

  const toConv = () => {
    if (active === false) {
      setActive(true);
      setConveyance(workers);
      setWorkers(aux);
    }
  };

  const db = getFirestore()

  const newCreate = async () => {
    if (CW >= 100) {
      await updateDoc(doc(db, "user", user.id), {
        // Chez: actual - total,
        fleets: arrayUnion({ name: fleetName, mp: CW, workers: CWS, conveyance: CSS, workersCap: CS, fleetArr: fleet, rank: rank }),
        workers: arrayRemove(...fleet),
        conveyance: arrayRemove(...fleet)
      });
      setFleet([])
      setMsj('Fleet successfully created')
      setColor('green')
      setTimeout(() => {
        setMsj('')
      }, 2000)
    } else {
      setMsj('You must have at least 100 MP')
      setColor('red')
      setTimeout(() => {
        setMsj('')
      }, 2000)
    }
    
  };

  return (
    <CreateStyle>
      <Link to={'/fleets'}>
      <button className="backBtn">Back</button>
      </Link>
      <section className="createContainer">
        <div className="filters">
          <button className={active ? "active" : ""} onClick={toConv}>
            Workers
          </button>
          <button className={active ? "" : "active"} onClick={toWork}>
            Conveyance
          </button>
          <button
            className="active"
          >
            ALL
          </button>
          <button
            // onClick={() => setWorkers(workers.filter((e) => e.num === 1))}
            style={{cursor: 'not-allowed'}}
          >
            1
          </button>
          <button
            // onClick={() => setWorkers(user.workers.filter((e) => e.num === 2))}
            style={{cursor: 'not-allowed'}}
          >
            2
          </button>
          <button
            // onClick={() => setWorkers(user.workers.filter((e) => e.num === 2))}
            style={{cursor: 'not-allowed'}}
          >
            3
          </button>
          <button
            // onClick={() => setWorkers(user.workers.filter((e) => e.num === 2))}
            style={{cursor: 'not-allowed'}}
          >
            4
          </button>
          <button
            // onClick={() => setWorkers(user.workers.filter((e) => e.num === 2))}
            style={{cursor: 'not-allowed'}}
          >
            5
          </button>
        </div>
        <div className="cardContainer">
          {workers.length !== 0
            ? workers.map((e, i) => (
                <div onClick={e.mp ? () => addFleet(e) : () => addCFleet(e)} key={i} className="createCard">
                  <img
                    src={`${
                      e.mp
                        ? "workers/worker" + e.num
                        : "conveyance/conveyance" + e.num
                    }.png`}
                  />
                  {e.mp ? <p>{e.mp} MP</p> : <p>{e.num} Workers</p>}
                  <p>{e.name}</p>
                </div>
              ))
            : ""}
        </div>
      </section>

      <section className="fleetContainer">
        <div className="currentStatus">
          <div className="current">{CW} MP</div>
          <div className="current">
            <img src="lateral/workers.svg" />{" "}
            <p>
              {CWS}/{CS}
            </p>
          </div>
          <div className="current">
            <img src="lateral/conveyance.svg" /> {CSS}/10
          </div>
          <div>
            <p>Fleet Name:</p>
            <input onChange={(e) => setFleetName(e.target.value)} />
          </div>
          <button onClick={newCreate}>Create Fleet</button>
        </div>
        {fleet.length === 0 ? (
          <p
            style={{
              color: "#FFF",
              display: "flex",
              margin: "0 auto",
            }}
          >
            Empty
          </p>
        ) : (
          fleet.map((e, i) => (
            <div onClick={() => addWorkers(e)} key={i} className="fleetCard">
              <img
                src={`${
                  e.mp
                    ? "workers/worker" + e.num
                    : "conveyance/conveyance" + e.num
                }.png`}
              />
              {e.mp ? <p>{e.mp} MP</p> : <p>{e.num} Workers</p>}
              <p>{e.name}</p>
            </div>
          ))
        )}
        {
          msg !== '' ?
          <Modal msg={msg} color={color} /> : ''
        }
      </section>
    </CreateStyle>
  );
};

export default CreateFleet;
