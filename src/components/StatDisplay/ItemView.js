import React, { useCallback, useContext, useEffect, useState } from 'react'
import { formatViewMode, formatEditMode } from './formatItemInfo'
import { ItemsContext } from '../../ItemsContext'
import { StatContext } from '../../StatContext'
import {
  Container,
  ItemImage,
  MainStat,
  ItemInfo,
  StarIcon,
  ArrowIcon,
  SelectButton
} from './styles'

export default function ItemView({ item, displayedItem, setDisplayed }) {
  const { handleSelectItem, data } = useContext(ItemsContext)
  const stats = useContext(StatContext)

  const { image, name, level, type } = item
  const [itemInfo, setItemInfo] = useState({})

  const handleSelect = () => {
    handleSelectItem(item)
    setDisplayed('stats')
  }

  const formatInfo = useCallback(() => {
    let newInfo = { ...item }

    if (displayedItem === 'view') {
      newInfo = { ...newInfo, ...formatViewMode(item, data) }
    } else {
      newInfo = { ...newInfo, ...formatEditMode(item, data, stats) }
    }

    setItemInfo(newInfo)
  }, [item, data, stats, displayedItem])

  useEffect(() => {
    formatInfo()
  }, [item, formatInfo])

  const { displayStars, baseAtk, category } = itemInfo
  return (
    <Container isItemView displayed={!(displayedItem === 'stats')}>
      <span className='layoutControl'>
        <ArrowIcon onClick={() => setDisplayed('stats')} />
        <p>
          {type}
          {displayedItem === 'view' ? `(View)` : `(Selected)`}
        </p>
      </span>
      <ItemInfo>
        <span>
          <StarIcon /> {displayStars}
        </span>
        {(level || level === 0) && (
          <span>
            {type === 'Artifact' ? '+' : 'Lvl.'}
            {level}
          </span>
        )}
        <span>{category}</span>
      </ItemInfo>
      <ItemImage>
        <img src={image} alt={name} />
      </ItemImage>
      <a
        href={
          type === 'Artifact'
            ? data.artifactSets[item.set].setUrl
            : item.pageUrl
        }
        className='title'>
        {name}
      </a>
      <MainStat>ATK {baseAtk}</MainStat>

      {window.innerWidth < 576 && (
        <SelectButton onClick={handleSelect}>Select</SelectButton>
      )}
    </Container>
  )
}
