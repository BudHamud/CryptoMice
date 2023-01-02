import React from "react";

const WorkerCard = ({ data }) => {
  const stars = Array.from(Array(data.num).keys());

  const deleteFleet = async (e) => {
    await updateDoc(doc(db, "user", userData.id), {
      // Chez: actual - total,
      fleets: arrayRemove(userData.fleets.find(elem => elem === e)),
    });
    setActu(Math.random())
    setFleet('')
    setMsg('Fleet deleted')
    setColor('green')
  }

  const sellFleet = async (e) => {
    await addDoc(collection(db, "market"), {...e, item: 'workers'});
    await updateDoc(doc(db, "user", userData.id), {
      // Chez: actual - total,
      fleets: arrayRemove(userData.workers.find(elem => elem === e)),
    });
    setActu(Math.random())
    setFleet('')
    setMsg('Fleet selled')
    setColor('green')
  }

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
      <div className="hidden">
        <button onClick={() => deleteFleet(e)}>Delete</button>
        <button onClick={() => sellFleet(e)}>Sell</button>
      </div>
    </div>
  );
};

export default WorkerCard;
