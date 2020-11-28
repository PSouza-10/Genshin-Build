import React, { useCallback, useContext, useEffect, useState } from 'react'
import { formatViewMode, formatEditMode } from './formatItemInfo'
import { ItemsContext } from '../../ItemsContext'
import { StatContext } from '../../StatContext'
import {
  Container,
  ItemImage,
  ItemInfo,
  StarIcon,
  CloseIcon,
  SelectButton
} from './styles'
import ArtifactView from './ArtifactStatComponents'
import WeaponView from './WeaponStatComponents'
import CharacterView from './CharacterStatComponents'

export default function ItemView({ item, displayedItem, setDisplayed }) {
  const { handleSelectItem, data } = useContext(ItemsContext)
  const stats = useContext(StatContext)
  const { image, name, level, type } = item

  const [itemInfo, setItemInfo] = useState({})

  const slotKey = type === 'Artifact' && item.slot.toLowerCase().split(' ')[0]
  const isViewMode = displayedItem === 'view'
  const mainStatIsEditable =
    !['flower', 'plume'].includes(slotKey) && !isViewMode

  const handleSelect = () => {
    handleSelectItem(item)
    setDisplayed('stats')
  }

  const formatInfo = useCallback(() => {
    let newInfo = { ...item }

    if (isViewMode) {
      newInfo = { ...newInfo, ...formatViewMode(item, data) }
    } else {
      newInfo = { ...newInfo, ...formatEditMode(item, data, stats) }
    }

    setItemInfo(newInfo)
  }, [item, data, stats, isViewMode])

  useEffect(() => {
    formatInfo()
  }, [item, formatInfo])

  const { displayStars, category } = itemInfo

  const typeMap = {
    Artifact: (
      <ArtifactView
        isEditable={mainStatIsEditable}
        link={data.artifactSets[item.set || 'Adventurer'].pageUrl}
        mainStat={itemInfo.mainStat}
        mainStatType={itemInfo.mainStatType}
        slot={slotKey}
        data={data}
        item={item}
      />
    ),
    Weapon: <WeaponView {...{ itemInfo, data, item }} />,
    Character: <CharacterView {...{ itemInfo, isViewMode, item }} />
  }

  return (
    <Container isItemView displayed={!(displayedItem === 'stats')}>
      <span className='layoutControl'>
        <CloseIcon onClick={() => setDisplayed('stats')} />
        <p>
          {type}
          {isViewMode ? `(View)` : `(Selected)`}
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
      {typeMap[type]}
      <SelectButton onClick={handleSelect}>
        {isViewMode ? 'Select' : 'Remove'}
      </SelectButton>
    </Container>
  )
}
