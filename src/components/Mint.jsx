import styled from "styled-components";

const MintStyle = styled.div `
    height: 500px;
    width: 500px;
    overflow: scroll;
`

const Mint = ({ estado }) => {



    return (
        <MintStyle>
            {
                estado.map(e => (
                    <p>{e}</p>
                ))
            }
        </MintStyle>
    );
}

export default Mint;
