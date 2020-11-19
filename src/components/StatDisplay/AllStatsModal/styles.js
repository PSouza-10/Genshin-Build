import styled, { css } from 'styled-components'

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 980;
  transition: all 0.3s ease;
  ${({ visible }) =>
    visible
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
`

export const Modal = styled.div`
  background-color: var(--bgSecondary);
  position: fixed;

  top: 5vh;
  bottom: 5vh;
  right: 5vw;
  left: 5vw;
  z-index: 980;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  ${({ open }) =>
    open
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}

  .header {
    background-color: var(--bgPrimary);
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.4rem;
      padding-left: 20px;
    }
    svg {
      height: 45px;
      width: 45px;
      transition: all 0.2s ease;
      cursor: pointer;
      &:hover {
        background-color: var(--primary);
        fill: var(--bgPrimary);
      }
    }
  }
  .body {
    display: flex;
    justify-content: center;
  }
`

export const StatTableColumn = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
`

export const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 6px;
  font-size: 1.2rem;
  background-color: ${({ even }) =>
    even ? 'var(--bgPrimary)' : 'var(--bgSecondary)'};

  .value {
    display: flex;
    .total {
      color: white;
    }
    .increase {
      color: var(--positive);
      margin-left: 5px;
    }
  }
`
