import React from "react";

const WorkerCard = ({ data }) => {
  const stars = Array.from(Array(data.num).keys());

  return (
    <div className="workerCard">
      <img src={`/workers/worker${data.num}.png`} />
      <img className="border" src={`/workers/border.png`} />
      <div className="stars">
        {stars.map((e, i) => (
          <img key={i} src="CHez.svg" />
        ))}
      </div>
      <p>{data.mp} MP</p>
      <p>{data.name} Mouse</p>
    </div>
  );
};

export default WorkerCard;
