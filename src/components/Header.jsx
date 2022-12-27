import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
  background-color: #1e2837;
  color: #fff;
  grid-area: header;
  position: fixed;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    ul {
      .logo {
        width: 150px;
        margin-right: 10px;
      }
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      li {
        list-style: none;
      }
    }
    .game {
      li {
        display: flex;
        align-items: center;
        background-color: #e44;
        padding: 10px;
        color: #000;
        img {
          width: 15px;
          margin-right: 5px;
        }
      }
    }
    .money {
      li:nth-child(1) {
        background-color: #345;
        padding: 10px;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          font-weight: 500;
        }
      }
      li:nth-child(2) {
        padding: 10px;
        border-radius: 5px;
        background-color: #265;
      }
      li:nth-child(3) {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          margin-right: 5px;
        }
      }
    }
  }
  @media (max-width: 720px) {
    nav {
      .game {
        li {
          p {
            display: none;
          }
        }
      }
      .money {
        li {
          span {
            display: none;
          }
          img {
            display: none;
          }
        }
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <nav>
        <ul className="game">
          <img className="logo" src="logo.png" alt="logo" />
          <li>
            <img src="addUser.svg" />
            <p>Create Fleet</p>
          </li>
        </ul>
        <ul className="money">
          <li>$CHez</li>
          <li>
            <span>Claim</span> 0 <span>CHez</span>
          </li>
          <li>
            <img src="CHez.svg" alt="CHez" /> 0 $CHez
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
};

export default Header;
