import styled, { css } from 'styled-components'
import { BiUpload } from 'react-icons/bi'
import { MdClose, MdKeyboardArrowLeft } from 'react-icons/md'
import { iconCSS } from '../ItemPicker/styles'

export const Container = styled.li`
  padding: 15px 15px;
  cursor: ${({ selected }) => (!selected ? 'pointer' : 'default')};
  transition: all 0.2s ease;
  position: relative;
  @media (max-width: 576px) {
    position: static;
  }
  &:hover {
    ${({ selected }) =>
      !selected
        ? css`
            fill: white;
          `
        : null}
  }
  ${({ selected }) =>
    selected
      ? css`
          background-color: var(--primary);
          fill: var(--bgSecondary);
          font-weight: 600;
        `
      : css`
          background-color: var(--bgSecondary);
          fill: var(--primary);
        `}
`

export const UploadIcon = styled(BiUpload)`
  ${iconCSS}
`
export const CloseIcon = styled(MdClose)`
  fill: var(--primary);
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: var(--primary);
    fill: var(--bgPrimary);
  }
  @media (min-width: 577px) {
    display: none;
  }
`

export const CloseArrow = styled(MdKeyboardArrowLeft)`
  fill: inherit;
  height: 60px;
  width: 30px;
  flex-shrink: 0;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 998;
  display: none;
  @media (max-width: 576px) {
    display: ${({ visible }) => (visible ? 'block' : 'none')};
  }
`
export const SelectFileModal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: var(--bgPrimary);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  transition: all 0.3s linear;
  z-index: 999;
  width: 320px;
  ${({ open }) =>
    css`
      visibility: ${open ? 'visible' : 'hidden'};
      transform: ${open ? 'translateX(0)' : 'translateX(-150%)'};
      opacity: ${open ? 1 : 0};
    `}
  .modalContent {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 576px) {
    left: 10vw;
    right: 10vw;
    top: 10vh;
    bottom: 10vh;
  }
`

const buttonCss = css`
  padding: 6px 6px;
  font-size: 1.1rem;
  border: 2px solid var(--primary);
  background-color: var(--bgPrimary);
  transition: all 0.2s ease;
  cursor: pointer;

  font-weight: 400;
  overflow: hidden;
  max-height: 39px;
  text-align: center;
  &:hover,
  &:focus {
    background-color: var(--primary);
    color: var(--bgSecondary);
    font-weight: 550;
  }
`
export const ModalContent = styled.div`
  display: flex;

  .modalHeader {
    flex-basis: 20%;
    text-align: center;
    background-color: var(--bgSecondary);
    padding: 10px 10px;
  }
  .modalBody {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 26px;
    justify-content: space-between;
    input[type='file'] {
      display: none;
    }
    label,
    button {
      ${buttonCss}
    }
    button:disabled {
      opacity: 0.4;
      &:hover,
      &:focus {
        background-color: var(--bgPrimary);
        color: var(--primary);
        font-weight: initial;
      }
    }
  }
  .closeArrow {
    flex-basis: 8%;
    background-color: var(--bgSecondary);
    fill: var(--primary);
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background-color: var(--primary);
      fill: var(--bgSecondary);
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    .modalHeader {
      height: 50px;
      flex-basis: initial;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.6rem;

      padding: 0;
      span {
        padding-left: 20px;
      }
    }

    .modalBody {
      flex-direction: column;
      justify-content: space-evenly;
      align-items: stretch;
    }
    .closeArrow {
      display: none;
    }
  }
`
