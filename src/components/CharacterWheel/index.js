import React, { useContext, useEffect, useState } from 'react'
import { Container, ItemRow } from './styles'

import { ItemsContext } from '../../ItemsContext'
import ItemRenderer from './ItemRenderer'

export function CharacterWheel() {
  const { selectedItems } = useContext(ItemsContext)

  return (
    <div className='charWheel'>
      <Container>
        <ItemRow justify='center'>
          <Item {...selectedItems.flower} slotType='artifact' />
        </ItemRow>
        <ItemRow justify='space-between'>
          <Item {...selectedItems.circlet} slotType='artifact' />
          <Item {...selectedItems.character} slotType='character' />
          <Item {...selectedItems.plume} slotType='artifact' />
        </ItemRow>
        <ItemRow justify='space-around'>
          <Item {...selectedItems.goblet} slotType='artifact' />
          <Item {...selectedItems.sands} slotType='artifact' />
        </ItemRow>
      </Container>
      <Container RightColumn>
        <Item {...selectedItems.weapon} slotType='weapon' />
      </Container>
    </div>
  )
}

const Item = ({ id, image, name = '', slotType, rarity = 1, set, type }) => {
  const isArtifact = slotType === 'artifact'
  const { artifactSets } = useContext(ItemsContext).data
  const [level, setLevel] = useState(1)
  const [stars, setStars] = useState(isArtifact ? 1 : 4)
  const [maxLevel, setMaxLevel] = useState(isArtifact ? 4 : 90)
  const [artifactRarity, setRarity] = useState({
    minRarity: 1,
    maxRarity: 5
  })

  useEffect(() => {
    setStars(rarity)
  }, [rarity, setStars])
  useEffect(() => {
    if (artifactSets[set]) {
      const { minRarity, maxRarity } = artifactSets[set]
      setRarity({ minRarity, maxRarity })
      setStars(minRarity)
    }
  }, [set, artifactSets, setStars])

  const handleLevel = operation => {
    if (operation === 'plus' || operation === 'minus') {
      const newLevel = operation === 'plus' ? level + 1 : level - 1
      setLevel(newLevel)
    } else {
      setLevel(operation)
    }
  }
  const handleStars = operation => {
    const newStars = operation === 'plus' ? stars + 1 : stars - 1
    const newMaxLevel = newStars > 2 ? newStars * 4 : 4

    if (level > newMaxLevel) setLevel(newMaxLevel)
    setMaxLevel(newMaxLevel)
    setStars(newStars)
  }
  const isMaxLevel = level === maxLevel

  const rendererProps = {
    id,
    level,
    stars,
    name,
    isArtifact,
    image,
    slotType,
    maxLevel,
    isMaxLevel,
    artifactRarity,
    type,
    handleLevel,
    handleStars
  }
  return <ItemRenderer {...rendererProps} />
}
