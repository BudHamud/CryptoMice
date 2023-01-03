import styled from "styled-components";

const ModalStyle = styled.div`
background-color: red;
border-radius: 10px;
position: fixed;
padding: 10px;
bottom: 20px;
right: 20px;
z-index: 4;
`

const Modal = ({ msg, color }) => {

    return (
        <ModalStyle style={{backgroundColor: color}}>
            {msg}
        </ModalStyle>
    );
}

export default Modal;
