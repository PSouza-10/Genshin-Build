import React, { useContext } from 'react'
import { Container, ItemRow, ClearIcon } from './styles'

import { ItemsContext } from '../../ItemsContext'
import ItemRenderer from './ItemRenderer'

export function CharacterWheel() {
  const { clearItems } = useContext(ItemsContext)

  return (
    <div className='charWheel'>
      <ClearIcon onClick={clearItems} />
      <Container>
        <ItemRow justify='center'>
          <Item itemSlot='flower' slotType='artifact' />
        </ItemRow>
        <ItemRow justify='space-between'>
          <Item itemSlot='circlet' slotType='artifact' />
          <Item itemSlot='character' slotType='character' />
          <Item itemSlot='plume' slotType='artifact' />
        </ItemRow>
        <ItemRow justify='space-around'>
          <Item itemSlot='goblet' slotType='artifact' />
          <Item itemSlot='sands' slotType='artifact' />
        </ItemRow>
      </Container>
      <Container RightColumn>
        <Item itemSlot='weapon' slotType='weapon' />
      </Container>
    </div>
  )
}

const Item = ({ itemSlot }) => {
  const { setStats, selectedItems } = useContext(ItemsContext)
  const item = selectedItems[itemSlot]

  const { level, ascension, stars, maxLevel } = item

  const isArtifact = !['character', 'weapon'].includes(itemSlot)

  const handleLevel = operation => {
    if (operation === 'plus' || operation === 'minus') {
      const newLevel = operation === 'plus' ? level + 1 : level - 1
      setStats(itemSlot, { level: newLevel })
    } else {
      setStats(itemSlot, { level: operation })
    }
  }

  const handleUpgrade = operation => {
    if (operation === 'plus' || operation === 'minus') {
      const initialValue = isArtifact ? stars : ascension
      const newUpgrade =
        operation === 'plus' ? initialValue + 1 : initialValue - 1
      const newValue = isArtifact
        ? { stars: newUpgrade }
        : { ascension: newUpgrade }
      setStats(itemSlot, newValue)
    } else {
      setStats(itemSlot, { ascension: operation })
    }
  }

  const isMaxLevel = level === maxLevel

  const rendererProps = {
    itemSlot,
    isArtifact,
    isMaxLevel,
    handleLevel,
    handleUpgrade,
    item
  }

  return <ItemRenderer {...rendererProps} />
}
