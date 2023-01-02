import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ConveyanceCard from "../components/ConveyanceCard";
import { MintStyle } from "../components/Mint";
import { useUserContext } from "../context/UserContext";
import getUser from "../hooks/getUser";
import { WorkerStyle } from "./Workers";
import Modal from "../components/Modal";

const Conveyance = () => {
  const [estado, setEstado] = useState([]);
  const [space, setSpace] = useState(0);
  const [msg, setMsg] = useState('')
  const [color, setColor] = useState('')
  const [userData, loadUser] = getUser();

  const { user, setActu } = useUserContext()

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
        conveyance: arrayUnion({ name: "Wire", num: 1, id: Math.round(Math.random()*100000)  }),
        chez: userData.chez - 5
      });
      setActu(mpnum)
    } else if (num <= 79) {
      await updateDoc(doc(db, "user", userData.id), {
        // Chez: actual - total,
        conveyance: arrayUnion({ name: "Pipe", num: 2, id: Math.round(Math.random()*100000)  }),
        chez: userData.chez - 5
      });
      setActu(mpnum)
    } else if (num <= 94) {
      await updateDoc(doc(db, "user", userData.id), {
        // Chez: actual - total,
        conveyance: arrayUnion({ name: "Paper Boat", num: 3, id: Math.round(Math.random()*100000)  }),
        chez: userData.chez - 5
      });
      setActu(mpnum)
    } else if (num <= 98) {
      await updateDoc(doc(db, "user", userData.id), {
        // Chez: actual - total,
        conveyance: arrayUnion({ name: "Toy Car", num: 4, id: Math.round(Math.random()*100000)  }),
        chez: userData.chez - 5
      });
      setActu(mpnum)
    } else {
      await updateDoc(doc(db, "user", userData.id), {
        // Chez: actual - total,
        conveyance: arrayUnion({ name: "Wood Horse", num: 5, id: Math.round(Math.random()*100000)  }),
        chez: userData.chez - 5
      });
      setActu(mpnum)
    }
    setMsg('Successful operation');
    setColor('green')
    setTimeout(() => {
      setMsg('')
    }, 2000)
    } else {
      setMsg('Not CHez enought');
      setColor('red')
      setTimeout(() => {
        setMsg('')
      }, 2000)
    }
    
  };

  return (
    <WorkerStyle>
      <div className="hubContainer">
        <div>
          <p>Mint Conveyance</p>
          <button onClick={mint} className="mintBtn"><img src="drop.svg" /> 5 CHez</button>
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
        {!loadUser ? userData.conveyance.map((e, i) => (
          <ConveyanceCard key={i} data={e} />
        )) : <p style={{display: 'flex', justifyContent: 'center', color: '#FFF'}}>Loading...</p> }
      </MintStyle>
      {
        msg !== '' ?
        <Modal msg={msg} color={color} /> : ''
      }
      
    </WorkerStyle>
  );
};

export default Conveyance;
