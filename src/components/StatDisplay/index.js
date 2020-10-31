import React, { useContext } from 'react'
import { Container, ItemImage, MainStat, ItemInfo, StarIcon } from './styles'
import { ItemsContext } from '../../ItemsContext'

export function StatDisplay() {
  const { selectedItems, displayedItem } = useContext(ItemsContext)
  const {
    image,
    name,
    baseAtk,
    type,
    stars,
    element,
    category,
    level,
    minRarity,
    maxRarity
  } = selectedItems[displayedItem]
  const isArtifact = !['Character', 'Weapon'].includes(type)
  const findDisplayType = () => {
    const displayType = {
      Weapon: category,
      Character: element
    }
    if (!isArtifact) {
      return displayType[type]
    } else {
      return type
    }
  }

  const displayStars =
    displayedItem === 'view'
      ? isArtifact
        ? `${minRarity}~${maxRarity}`
        : stars
      : stars
  return (
    <Container>
      <ItemInfo>
        <span>
          {type && (
            <>
              <StarIcon /> {displayStars}
            </>
          )}
        </span>
        {level && <span>Lvl.{level}</span>}
        <span>{findDisplayType()}</span>
      </ItemInfo>
      <ItemImage>
        <img src={image} alt={name} />
      </ItemImage>
      <h1 className='title'>{name}</h1>
      {type === 'Weapon' && <MainStat>ATK {baseAtk}</MainStat>}
    </Container>
  )
}
