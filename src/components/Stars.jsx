import styled from "styled-components";

const StarStyle = styled.div`
  position: absolute;
  bottom: 50px;
  img {
    width: 1.5rem !important;
    padding: 1px;
    background-color: #fbedd0;
    border-radius: 100px;
  }
`;

const Stars = ({ data, bool }) => {
  const stars = Array.from(Array(data.num).keys());

  return (
    <>
      {bool ? (
        <div>
          {stars.map((e, i) => (
            <img key={i} src="/CHez.svg" />
          ))}
        </div>
      ) : (
        <StarStyle>
          {stars.map((e, i) => (
            <img key={i} src="/CHez.svg" />
          ))}
        </StarStyle>
      )}
    </>
  );
};

export default Stars;
