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
    border-radius: 20px;
    .hidden {
        display: none;
        position: absolute;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: 100.4%;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 20px;
        button {
          padding: 3px 0px;
          background-color: transparent;
          border: none;
          border-radius: 10px;
          width: 90%;
          background-color: #2fa;
          font-weight: 500;
        }
      }
      &:hover .hidden {
        display: flex;
      }
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
