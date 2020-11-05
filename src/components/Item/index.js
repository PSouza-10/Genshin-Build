import React, { useContext } from 'react'
import { ItemsContext } from '../../ItemsContext'
import styled from 'styled-components'
import { Wrapper, Image, elements, elementIconCSS } from './styles'

let elementIcons = {}
for (let varName in elements) {
  elementIcons[varName] = React.createElement(
    styled(elements[varName])`
      ${elementIconCSS}
    `,
    { className: 'elementIcon' }
  )
}
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
      {type === 'Character' && elementIcons[item.element]}
      <Image src={image} alt={name} />
    </Wrapper>
  )
}
