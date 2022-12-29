import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import Cargando from "./Cargando";

const PlanetCard = (props) => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState('')
  const [roll, setRoll] = useState(0)

  const getNum = () => {
    setLoading(!loading);
    setEstado('pending')
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      // setLoading(false);
      const num = Math.ceil(Math.random() * 100)
      if (num <= props.percent) setEstado('success')
      else setEstado('failed')
      setRoll(num)
    }, 3000);
  };

  const exit = () => {
    document.body.style.overflow = null
    setLoading(false)
  }

  return (
    <article className="planetCard">
      <h3>{props.planet}</h3>
      <div className="divider">
        <div className="reqMp">
          <p>Required MP</p>
          <p>
            <span>{props.mp}</span> MP
          </p>
        </div>

        <div className="fuelCost">
          <p>Fuel cost</p>
          <p>
            <span>{props.fuel}</span> Fuel
          </p>
        </div>

        <div className="expGain">
          <p>Experiencie gain</p>
          <p>
            <span>{props.exp}</span> EXP
          </p>
        </div>
      </div>

      <div className="imgPlanet">
        <img loading={'lazy'} src={props.img} />
      </div>

      <div className="main">
        <p>
          <span style={{ backgroundColor: "#000" }}>{props.percent}%</span>
        </p>
        <p>to earn</p>
        <p>
          <span style={{ backgroundColor: "#FA8" }}>{props.CHez} $CHez</span>
        </p>
      </div>

      <div className="divider">
        <div className="planetDiv">
          <p>Base Success</p>
          <p>
            <span>{props.percent}</span>%
          </p>
        </div>

        <div className="planetDiv">
          <p>Rank Bonus</p>
          <p>
            <span>{props.rank === undefined ? 0 : props.rank}</span>%
          </p>
        </div>

        <div className="planetDiv">
          <p>Veteran Bonus</p>
          <p>
            <span>{props.veteran === undefined ? 0 : props.veteran}</span>%
          </p>
        </div>
      </div>

      {user.mp >= props.mp ? (
        <button onClick={getNum} className="getBtn">
          Start Expedition
        </button>
      ) : (
        ""
      )}

      {loading ? 
        <Cargando exit={exit} estado={estado} mp={props.percent} roll={roll} CHez={props.CHez} /> 
      : ""}
    </article>
  );
};

export default PlanetCard;
