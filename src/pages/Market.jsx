import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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
`;
const Market = () => {
  const [loading, setLoading] = useState(true);
  const [marketItem, setItem] = useState([]);

  const ranked = ["D", "C", "B", "A", "S"];

  const {item} = useParams()

  useEffect(() => {
    const db = getFirestore();
    const queryCollection = collection(db, "market");

    const queryCollectionFilter = item ?  query(queryCollection, where('item', '==', item)) : queryCollection;

    getDocs(queryCollectionFilter)
      .then((resp) =>
        setItem(resp.docs.map((prod) => ({ id: prod.id, ...prod.data() })))
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [item]);

  return (
    <MarketStyle>
      <h2>Market</h2>
      <section className="marketContainer">
        {!loading
          ? marketItem.map((e, i) => (
              <div key={i} className="fleetCard">
                <p>{e.name}</p>
                <div className="extra">
                  <p>
                    Workers {e.workers} / {e.workersCap}
                  </p>
                  <p>Conveyance {e.conveyance} / 10</p>
                  <p>Rank {e.rank ? ranked[e.rank - 1] : "D"}</p>
                </div>
                <img src="/fleet/fleet1.jpg" />
                <p>{e.mp} MP</p>
                <button>Buy</button>
              </div>
            ))
          : ""}
      </section>
    </MarketStyle>
  );
};

export default Market;
