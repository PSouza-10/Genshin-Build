import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ItemsContext } from '../../ItemsContext'
export default function Item({ item }) {
  const { id, image, name, type } = item

  const {
    selectedItems,
    handleSelectItem,
    handleItemDisplay,
    formatSlot
  } = useContext(ItemsContext)

  const itemSlot = formatSlot(type === 'Artifact' ? item.slot : type)

  return (
    <Wrapper
      selected={selectedItems[itemSlot].id === id}
      onClick={() => handleItemDisplay(item, true)}
      onDoubleClick={() =>
        window.innerWidth >= 576 ? handleSelectItem(item) : null
      }
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
