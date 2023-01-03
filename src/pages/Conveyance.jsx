import { addDoc, arrayRemove, arrayUnion, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MintStyle } from "../components/Mint";
import { useUserContext } from "../context/UserContext";
import getUser from "../hooks/getUser";
import { WorkerStyle } from "./Workers";
import Modal from "../components/Modal";
import Stars from "../components/Stars";
import ModalMedium from "../components/ModalMedium";

const Conveyance = () => {
  const [estado, setEstado] = useState([]);
  const [space, setSpace] = useState(0);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [sellMsg, setSellMsg] = useState("");
  const [sellPrice, setPrice] = useState(0)
  const [isSell, setIsSell] = useState([])
  const [userData, loadUser] = getUser();

  const { user, setActu } = useUserContext();

  useEffect(() => {
    if (!loadUser) {
      let num = 0;
      userData.conveyance.map((e) => {
        num += e.num;
      });
      setSpace(num);
    }
  }, [userData]);

  const db = getFirestore();

  const mint = async () => {
    if (userData.chez >= 5) {
      const num = Math.ceil(Math.random() * 100);
      const mpnum = Math.ceil(Math.random() * 50);
      if (num <= 44) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          conveyance: arrayUnion({
            name: "Wire",
            num: 1,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 5,
        });
        setActu(mpnum);
      } else if (num <= 79) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          conveyance: arrayUnion({
            name: "Pipe",
            num: 2,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 5,
        });
        setActu(mpnum);
      } else if (num <= 94) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          conveyance: arrayUnion({
            name: "Paper Boat",
            num: 3,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 5,
        });
        setActu(mpnum);
      } else if (num <= 98) {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          conveyance: arrayUnion({
            name: "Toy Car",
            num: 4,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 5,
        });
        setActu(mpnum);
      } else {
        await updateDoc(doc(db, "user", userData.id), {
          // Chez: actual - total,
          conveyance: arrayUnion({
            name: "Wood Horse",
            num: 5,
            id: Math.round(Math.random() * 100000),
          }),
          chez: userData.chez - 5,
        });
        setActu(mpnum);
      }
      setMsg("Successful operation");
      setColor("green");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    } else {
      setMsg("Not CHez enought");
      setColor("red");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };

  const deleteFleet = async () => {
    await updateDoc(doc(db, "user", userData.id), {
      // Chez: actual - total,
      conveyance: arrayRemove(estado),
    });
    setActu(Math.random());
    setSellMsg('')
    setMsg("Conveyance deleted");
    setColor("green");
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  const deleteModal = (e) => {
    setIsSell(false)
    setSellMsg('Are you sure? You will lose this conveyance')
    setEstado(e)
  }

  const sellModal = (e) => {
    setIsSell(true)
    setSellMsg('Set conveyance price');
    setEstado(e)
  }

  const closeClick = () => {
    setSellMsg('')
  }

  const sellFleet = async () => {
    await addDoc(collection(db, "market"), {...estado, item: 'conveyance', userId: userData.id, price: sellPrice.target.value});
    await updateDoc(doc(db, "user", userData.id), {
      // Chez: actual - total,
      conveyance: arrayRemove(estado),
    });
    setActu(Math.random())
    setSellMsg('')
    setMsg('Conveyance published in market')
    setColor('green')
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  return (
    <WorkerStyle>
      <div className="hubContainer">
        <div>
          <p>Mint Conveyance</p>
          <button onClick={mint} className="mintBtn">
            <img src="drop.svg" /> 5 CHez
          </button>
        </div>

        <div>
          <p>Current Conveyance</p>
          <p>{!loadUser ? userData.conveyance.length : 0}</p>
        </div>

        <div>
          <p>Max Workers</p>
          <p>{space}</p>
        </div>
      </div>
      <MintStyle>
        {!loadUser ? (
          userData.conveyance.map((e, i) => (
            <div key={i} className="workerCard">
              <img src={`/conveyance/conveyance${e.num}.png`} />
              <div className="conveyanceStars">
                <Stars data={e} bool={true} />
              </div>
              <p>{e.num} Workers</p>
              <div className="hidden">
                <button onClick={() => deleteModal(e)}>Delete</button>
                <button onClick={() => sellModal(e)}>Sell</button>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{ display: "flex", justifyContent: "center", color: "#FFF" }}
          >
            Loading...
          </p>
        )}
      </MintStyle>
      {msg !== "" ? <Modal msg={msg} color={color} /> : ""}
      {
        sellMsg !== "" ? <ModalMedium msg={sellMsg} onChg={setPrice} funClick={sellFleet} closeClick={closeClick} sure={deleteFleet} isSell={isSell} /> : ""
      }
    </WorkerStyle>
  );
};

export default Conveyance;
