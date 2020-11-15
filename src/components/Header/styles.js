import styled, { css } from 'styled-components'
import { IoIosShareAlt } from 'react-icons/io'
import { MdClose, MdHelpOutline } from 'react-icons/md'
import { BiLinkAlt, BiDownload } from 'react-icons/bi'
export const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: var(--bgSecondary);
  justify-content: space-between;
  .iconWrapper {
    align-self: stretch;
    width: 50px;
    padding: 6px 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: var(--primary);
      .icon {
        fill: var(--bgSecondary);
      }
    }
  }
`

export const Brand = styled.h1`
  font-size: 22px;
  @media (max-width: 576px) {
    font-size: 18px;
  }
`

export const ShareIcon = styled(IoIosShareAlt)`
  fill: var(--primary);
  height: 38px;
  width: 38px;
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
export const ShareModal = styled.div`
  position: fixed;
  right: 20px;
  top: 0;
  background-color: var(--bgPrimary);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  transition: all 0.3s linear;
  z-index: 999;
  overflow: hidden;
  ${({ open }) =>
    css`
      visibility: ${open ? 'visible' : 'hidden'};
      transform: ${open ? 'translateX(0)' : 'translateX(150%)'};
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
`
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  .modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bgSecondary);
    height: 50px;
    h1 {
      font-size: 1.6rem;
      padding: 0px 20px;
    }
  }

  .modalBody {
    display: flex;
    flex-direction: column;
    flex: 1;
    .shareOption {
      text-align: center;
      padding: 12px 12px;
      cursor: pointer;
      flex-basis: 33%;
      transition: all 0.3s ease;
      h3 {
        font-size: 1.2rem;
      }

      &:hover {
        background-color: var(--primary);
        h3 {
          color: var(--bgPrimary);
        }
        .icon {
          fill: var(--bgPrimary);
        }
      }
      input {
        opacity: 0;
        cursor: pointer;
      }
    }

    @media (min-width: 577px) {
      .shareOption[name='chooseApp'] {
        display: none;
      }
      .shareOption {
        flex-basis: 50%;
      }
    }
  }
`

const shareOptionIconCss = css`
  fill: var(--primary);
  height: 100px;
  width: 100px;
`
export const CopyLink = styled(BiLinkAlt)`
  ${shareOptionIconCss}
`

export const DownloadJson = styled(BiDownload)`
  ${shareOptionIconCss}
`

export const ChooseApp = styled(IoIosShareAlt)`
  ${shareOptionIconCss}
`
export const HelpIcon = styled(MdHelpOutline)`
  fill: var(--primary);
  height: 38px;
  width: 38px;
`
