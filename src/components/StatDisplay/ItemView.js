import React, { useContext } from 'react'

import { ItemsContext } from '../../ItemsContext'
import {
  Container,
  ItemImage,
  MainStat,
  ItemInfo,
  StarIcon,
  ArrowIcon,
  SelectButton
} from './styles'

export default function ItemView({ item, displayedItem, setDisplayed, stats }) {
  const { handleSelectItem } = useContext(ItemsContext)
  const {
    image,
    name,
    type,
    stars,
    element,
    category,
    slot,
    level,
    minRarity,
    maxRarity
  } = item

  const isArtifact = type === 'Artifact'
  const handleSelect = () => {
    handleSelectItem(item)
    setDisplayed('stats')
  }
  const findDisplayType = () => {
    const displayType = {
      Weapon: category,
      Character: element
    }
    if (!isArtifact) {
      return displayType[type]
    } else {
      return slot
    }
  }

  const displayStars =
    displayedItem === 'view'
      ? isArtifact
        ? `${minRarity}~${maxRarity}`
        : stars
      : stars

  return (
    <Container isItemView displayed={!(displayedItem === 'stats')}>
      <span className='layoutControl'>
        <ArrowIcon onClick={() => setDisplayed('stats')} />
      </span>
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
      {type !== 'Artifact' && <MainStat>ATK {item.baseAtk}</MainStat>}

      {window.innerWidth < 576 && (
        <SelectButton onClick={handleSelect}>Select</SelectButton>
      )}
    </Container>
  )
}
