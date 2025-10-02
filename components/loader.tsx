"use client";

import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className='pyramid-loader'>
        <div className='movable-bg'></div>
        <div className='wrapper'>
          <span className='side side1' />
          <span className='side side2' />
          <span className='side side3' />
          <span className='side side4' />
          <span className='shadow' />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pyramid-loader {
    position: relative;
    width: 100vh;
    height: 100vh;
    display: block;
    transform-style: preserve-3d;
    transform: rotateY(-20deg);
    display: grid;
    margin: auto;
    place-items: center;
  }

  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    50% {
      transform: rotateX(360deg);
    }
  }

  .pyramid-loader .wrapper .side {
    width: 70px;
    height: 70px;
    /* you can choose any gradient or color you want */
    /* background: #0BD8F4; */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform-origin: center top;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  .pyramid-loader .wrapper .side1 {
    transform: rotateZ(-30deg) rotateY(90deg);
    background: #8fedfa;
  }

  .pyramid-loader .wrapper .side2 {
    transform: rotateZ(30deg) rotateY(90deg);
    background: #63e6f8;
  }

  .pyramid-loader .wrapper .side3 {
    transform: rotateX(30deg);
    background: #bbf4fc;
  }

  .pyramid-loader .wrapper .side4 {
    transform: rotateX(-30deg);
    background: #09b1c8;
  }

  .pyramid-loader .wrapper .shadow {
    width: 60px;
    height: 60px;
    background: #8b5ad5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotateX(90deg) translateZ(-40px);
    filter: blur(12px);
  }
  .movable-bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    animation: moveBg 2.9s linear infinite;
    filter: blur(2px);
  }
  .movable-bg::before {
    content: "";
    background: url("/waves.svg") no-repeat center/cover;
    position: absolute;
    width: 100vw;
    height: 100vh;
    animation: moveBg 2.9s linear infinite;
  }
  .movable-bg::after {
    content: "";
    background: url("/waves-after.svg") no-repeat center/cover;
    position: absolute;
    width: 100vw;
    height: 100vh;
    animation: moveBg 2.9s linear infinite;
  }

  @keyframes moveBg {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

export default Loader;
