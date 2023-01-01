import styled from "styled-components";
import WorkerCard from "./WorkerCard";

export const MintStyle = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  .workerCard {
    color: #fff;
    width: 210px;
    background-color: #253653;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-radius: 10px;
    img {
      width: 200px;
    }
    .border {
      position: absolute;
      top: 0;
    }
    .stars {
      position: absolute;
      bottom: 50px;
      img {
        width: 1.5rem;
        padding: 1px;
        background-color: #fbedd0;
        border-radius: 100px;
      }
    }
    .conveyanceStars {
      position: absolute;
      bottom: 25px;
      img {
        width: 1.5rem;
        padding: 1px;
        background-color: #fbedd0;
        border-radius: 100px;
      }
    }
  }
  @media (max-width: 1020px) {
    .workerCard {
      width: 150px;
      img {
        width: 100%;
      }
    }
  }
  /* @media (max-width: 720px) {
    padding-top: 70px;
    width: 100%;
  } */
`;

const Mint = ({ estado }) => {
  return (
    <MintStyle>
      {estado.map((e, i) => (
        <WorkerCard key={i} data={e} />
      ))}
    </MintStyle>
  );
};

export default Mint;
