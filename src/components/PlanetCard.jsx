import React from "react";

const PlanetCard = (props) => {
  return (
    <article className="planetCard">
      <h3>{props.planet}</h3>
      <div className="divider">
        <div className="reqMp">
          <p>Required MP</p>
          <p><span>{props.mp}</span> MP</p>
        </div>

        <div className="fuelCost">
          <p>Fuel cost</p>
          <p><span>{props.fuel}</span> Fuel</p>
        </div>

        <div className="expGain">
          <p>Experiencie gain</p>
          <p><span>{props.exp}</span> EXP</p>
        </div>
      </div>
      
      <div className="imgPlanet">
      <img src={props.img} />
      </div>

      <div className="main">
      <p><span style={{backgroundColor: '#000'}}>{props.percent}%</span></p>
      <p>to earn</p>
      <p><span style={{backgroundColor: '#FA8'}}>{props.CHez} $CHez</span></p>
      </div>

      <div className="divider">
        <div className="planetDiv">
          <p>Base Success</p>
          <p><span>{props.base}</span>%</p>
        </div>

        <div className="planetDiv">
          <p>Rank Bonus</p>
          <p><span>{props.rank}</span>%</p>
        </div>

        <div className="planetDiv">
          <p>Veteran Bonus</p>
          <p><span>{props.veteran}</span>%</p>
        </div>
      </div>
    </article>
  );
};

export default PlanetCard;
