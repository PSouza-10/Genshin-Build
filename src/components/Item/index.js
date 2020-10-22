import React from 'react'
import styled from 'styled-components'
export default function Item({ image, name }) {
  return (
    <Wrapper>
      <Image src={image} alt={name} />
    </Wrapper>
  )
}
const Wrapper = styled.span`
  position: relative;
  z-index: 2;
  margin-right: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`
const Image = styled.img`
  cursor: pointer;
  z-index: 1;
`
