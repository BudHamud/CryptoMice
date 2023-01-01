import React from 'react';

const ConveyanceCard = ({data}) => {
    const stars = Array.from(Array(data.num).keys());

  return (
    <div className="workerCard">
      <img src={`/conveyance/conveyance${data.num}.png`} />
      <div className="conveyanceStars">
        {stars.map((e, i) => (
          <img key={i} src="CHez.svg" />
        ))}
      </div>
      <p>{data.num} Workers</p>
    </div>
  );
}

export default ConveyanceCard;
