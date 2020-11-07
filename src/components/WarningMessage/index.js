import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { MessageContext } from '../../MessageContext'

export default function WarningMessage() {
  const { message, messageIsVisible, type, title } = useContext(MessageContext)

  const messageColors = {
    Warning: {
      text: 'white',
      background: 'var(--negative)',
      title: 'white'
    },
    Info: {
      text: 'white',
      title: 'var(--primary)',
      background: 'black'
    }
  }

  return (
    <Container
      colors={messageColors[type || 'Warning']}
      isVisible={messageIsVisible}>
      <h2>{title}</h2>
      <p>{message}</p>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;

  top: 0;
  right: 30%;
  left: 30%;

  @media (max-width: 576px) {
    right: 0;
    left: 0;
  }
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  padding: 12px 12px;
  overflow: hidden;
  ${({ isVisible }) =>
    isVisible
      ? css`
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          visibility: hidden;
          opacity: 0;
          transform: translateY(-100%);
        `}

  h2 {
    font-size: 1.6rem;
  }
  z-index: 999;
  p {
    font-size: 1.3rem;
  }

  ${({ colors: { title, text, background } }) => css`
    background-color: ${background};
    p {
      color: ${text};
    }

    h2 {
      color: ${title};
    }
  `}
`
