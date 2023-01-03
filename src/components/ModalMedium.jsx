import styled from "styled-components";

const MediumStyle = styled.div`
  background-color: #344;
  border-radius: 10px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px  10px 10px 10px;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  input {
    margin: 20px 0;
    background-color: #234;
    border: solid 1px #FFF;
    color: #FFF;
    padding: 5px;
    border-radius: 5px;
  }
  button {
    padding: 5px 15px;
    border: none;
    background-color: #2fa;
    font-weight: 500;
    border-radius: 10px;
  }
  .btnSell {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btnDiv {
    display: flex;
    gap: 10px;
    margin-top: 5px;
    button:nth-child(1) {
      background-color: #F33;
    }
    button:nth-child(2) {
      background-color: #234;
    }
  }
  .close {
    position: absolute;
    padding: 2px 10px;
    right: 0px;
    top: 0px;
    background-color: transparent;
    &:hover {
      background-color: #234;
    }
  }
`;

const ModalMedium = ({ msg, onChg, funClick, closeClick, isSell, sure }) => {
  return (
    <MediumStyle>
      <button onClick={closeClick} className="close">X</button>
      <p>{msg}</p>
      {
        isSell ? 
        <div className="btnSell">
        <input type={'number'} onChange={onChg} />
        <button onClick={funClick}>Sell</button>
        </div>
        :
        <div className="btnDiv">
        <button onClick={sure}>Yes</button>
        <button onClick={closeClick}>No</button>
        </div>
      }
    </MediumStyle>
  );
};

export default ModalMedium;
