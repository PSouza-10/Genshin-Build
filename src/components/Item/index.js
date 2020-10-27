import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ItemsContext } from '../../ItemsContext'
export default function Item({ id, image, name, type = '' }) {
  const itemSlot = type.toLowerCase().split(' ')[0]
  const { selectedItems, handleSelectItem } = useContext(ItemsContext)

  return (
    <Wrapper
      selected={selectedItems[itemSlot].id === id}
      onClick={() => handleSelectItem(id, itemSlot)}
      title={name}>
      <Image src={image} alt={name} />
    </Wrapper>
  )
}
const Wrapper = styled.span`
  position: relative;
  z-index: 2;
  margin-right: 10px;
  cursor: pointer;
  height: 60px;
  width: 57px;
  ${({ selected }) =>
    selected
      ? css`
          background-color: var(--primary);
          &:hover {
            background-color: var(--primary);
          }
        `
      : css`
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}
`
const Image = styled.img`
  z-index: 1;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
`
