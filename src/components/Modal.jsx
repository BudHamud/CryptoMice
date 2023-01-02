import styled from "styled-components";

const ModalStyle = styled.div`
background-color: red;
border-radius: 10px;
position: absolute;
padding: 10px;
bottom: 20px;
right: 20px;
`

const Modal = ({ msg, color }) => {

    return (
        <ModalStyle style={{backgroundColor: color}}>
            {msg}
        </ModalStyle>
    );
}

export default Modal;