import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  deleteDoc,
  increment,
} from "firebase/firestore";
import Stars from "../components/Stars";
import Modal from "../components/Modal";
import GetUser from "../hooks/getUser";
import { useUserContext } from "../context/UserContext";

const MarketStyle = styled.main`
  h2 {
    color: #fff;
  }
  .marketContainer {
    padding: 20px 0;
    background-color: #123;
    display: flex;
    justify-content: center;
    gap: 20px;
    text-align: center;
    flex-wrap: wrap;
    .fleetCard {
      width: 200px;
      background-color: #234;
      color: #fff;
      position: relative;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 90%;
        border-radius: 20px;
      }
      .extra {
        position: absolute;
        bottom: 100px;
        padding: 5px;
        text-align: left;
        left: 0;
        background-color: #932;
      }
      button {
        padding: 2px 8px;
        border: none;
        border-radius: 5px;
        background-color: #2fa;
        margin-bottom: 5px;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  @media (max-width: 1020px) {
    .marketContainer {
      .fleetCard {
        width: 150px;
        font-size: 15px;
      }
    }
  }
`;
const Market = () => {
  const [loading, setLoading] = useState(true);
  const [marketItem, setItem] = useState([]);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [userData] = GetUser();
  const { setActu, actu } = useUserContext();
  const ranked = ["D", "C", "B", "A", "S"];

  const { item } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const queryCollection = collection(db, "market");

    const queryCollectionFilter = item
      ? query(queryCollection, where("item", "==", item))
      : queryCollection;

    getDocs(queryCollectionFilter)
      .then((resp) =>
        setItem(resp.docs.map((prod) => ({ ...prod.data(), id: prod.id })))
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [item, actu]);

  const db = getFirestore();

  const buy = async (e) => {
    if (userData.chez < e.price) {
      setMsg("Insufficient CHez");
      setTimeout(() => {
        setMsg('')
      }, 2000)
    } else if (userData.id === e.userId) {
      setMsg("This item was published by you");
      setTimeout(() => {
        setMsg('')
      }, 2000)
    } else {
      if (e.item === "fleets") {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          fleets: arrayUnion({ ...e, userId: userData.id }),
          chez: userData.chez - e.price,
        });
      } else if (e.item === "conveyance") {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          conveyance: arrayUnion({ ...e, userId: userData.id }),
          chez: userData.chez - e.price,
        });
      } else {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          workers: arrayUnion({ ...e, userId: userData.id }),
          chez: userData.chez - e.price,
        });
      }
      await updateDoc(doc(db, "user", e.userId), {
        // Chez: actual - total,
        chez: increment(e.price),
      });
      await deleteDoc(doc(db, "market", e.id));
      setActu(Math.random());
      setMsg(`${e.item} succesfully acquired`);
      setColor("green");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };

  return (
    <MarketStyle>
      <h2>Market</h2>
      <section className="marketContainer">
        {!loading
          ? marketItem.map((e, i) => (
              <div key={i} className="fleetCard">
                <p>{e.name}</p>
                {e.item === "fleets" ? (
                  <div className="extra">
                    <p>
                      Workers {e.workers} / {e.workersCap}
                    </p>
                    <p>Conveyance {e.conveyance} / 10</p>
                    <p>Rank {e.rank ? ranked[e.rank - 1] : "D"}</p>
                  </div>
                ) : (
                  ""
                )}
                {e.item !== "fleets" ? <Stars key={i} data={e} /> : ""}
                <img
                  src={
                    e.rank
                      ? `/${e.item}/${e.item + e.rank}.jpg`
                      : `/${e.item}/${e.item + e.num}.png`
                  }
                />
                <p>{e.mp ? `${e.mp} MP` : `${e.num} Workers`}</p>
                <button onClick={() => buy(e)}>
                  {e.price ? e.price : 5} CHez
                </button>
              </div>
            ))
          : ""}
      </section>
      {msg !== "" ? <Modal msg={msg} color={color} /> : ""}
    </MarketStyle>
  );
};

export default Market;
