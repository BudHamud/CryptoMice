import { addDoc, arrayRemove, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ModalMedium from './ModalMedium'
import { useUserContext } from "../context/UserContext";
import GetUser from "../hooks/getUser";

const WorkerCard = ({ data }) => {

  const [msg, setMsg] = useState('')
  const [color, setColor] = useState('')
  const [userData] = GetUser()
  const {setActu} = useUserContext()
  const [sellMsg, setSellMsg] = useState("");
  const [sellPrice, setPrice] = useState(0)
  const [estado, setEstado] = useState([])
  const [isSell, setIsSell] = useState([])

  const stars = Array.from(Array(data.num).keys());

  const db = getFirestore()

  const deleteFleet = async () => {
    await updateDoc(doc(db, "user", userData.id), {
      // Chez: actual - total,
      workers: arrayRemove(estado),
    });
    setActu(Math.random())
    setSellMsg('')
    setMsg('Worker deleted')
    setColor('green')
    setTimeout(() => {
      setMsg('')
    }, 2000);
  }

  const deleteModal = (e) => {
    setIsSell(false)
    setSellMsg('Are you sure? You will lose this worker')
    setEstado(e)
  }

  const sellModal = (e) => {
    setIsSell(true)
    setSellMsg('Set worker price');
    setEstado(e)
  }

  const closeClick = () => {
    setSellMsg('')
    setEstado([])
  }

  const sellFleet = async () => {
    await addDoc(collection(db, "market"), {...estado, item: 'workers', userId: userData.id, price: sellPrice.target.value});
    await updateDoc(doc(db, "user", userData.id), {
      // Chez: actual - total,
      workers: arrayRemove(estado),
    });
    setActu(Math.random())
    setSellMsg('');
    setMsg('Worker published in market')
    setColor('green')
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }

  return (
    <>
    <div className="workerCard">
      <img src={`/workers/workers${data.num}.png`} />
      <img className="border" src={`/workers/border.png`} />
      <div className="stars">
        {stars.map((e, i) => (
          <img key={i} src="CHez.svg" />
        ))}
      </div>
      <p>{data.mp} MP</p>
      <p>{data.name} Mouse</p>
      <div className="hidden">
        <button onClick={() => deleteModal(data)}>Delete</button>
        <button onClick={() => sellModal(data)}>Sell</button>
      </div>
    </div>
    {
      msg !== '' ?
      <Modal msg={msg} color={color} /> : ''
    }
    {
      sellMsg !== "" ? <ModalMedium msg={sellMsg} onChg={setPrice} funClick={sellFleet} closeClick={closeClick} sure={deleteFleet} isSell={isSell} /> : ""
    }
    </>
  );
};

export default WorkerCard;
