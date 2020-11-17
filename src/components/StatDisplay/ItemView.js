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
  SelectButton,
  TalentContainer,
  IconButton
} from './styles'
import { ArtifactMainStat, ArtifactSubStats } from './ArtifactStatComponents'

import { FaMinus, FaPlus } from 'react-icons/fa'

export default function ItemView({ item, displayedItem, setDisplayed }) {
  const { handleSelectItem, data } = useContext(ItemsContext)
  const stats = useContext(StatContext)
  const { image, name, level, type } = item

  const slotKey = type === 'Artifact' && item.slot.toLowerCase().split(' ')[0]
  const mainStatIsEditable = !['flower', 'plume'].includes(slotKey)

  const [itemInfo, setItemInfo] = useState({})
  const isViewMode = displayedItem === 'view'
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

  const { displayStars, mainStat, category } = itemInfo
  return (
    <Container isItemView displayed={!(displayedItem === 'stats')}>
      <span className='layoutControl'>
        <ArrowIcon onClick={() => setDisplayed('stats')} />
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
      <a
        href={
          type === 'Artifact'
            ? data.artifactSets[item.set].setUrl
            : item.pageUrl
        }
        className='title'>
        {name}
      </a>
      {type === 'Artifact' && !isViewMode && mainStatIsEditable ? (
        <ArtifactMainStat slot={slotKey} mainStatIsEditable />
      ) : (
        <MainStat>{mainStat}</MainStat>
      )}
      {type === 'Artifact' && !isViewMode && (
        <ArtifactSubStats
          slot={slotKey}
          mainStatType={stats.artifactsAtk[slotKey].mainType}
        />
      )}
      {type === 'Weapon' && (
        <MainStat>{`${itemInfo.secondaryType} ${itemInfo.subStat}`}</MainStat>
      )}
      {type === 'Character' && (
        <Talent
          name={item.talent}
          base={item.talentBase}
          editable={!isViewMode}
        />
      )}
      {type === 'Weapon' && item.passive !== 'None' && (
        <>
          <h3 className='passiveName'>{item.passive}</h3>
          <p className='passiveDescription'>{data.passives[item.passive]}</p>
        </>
      )}

      <SelectButton onClick={handleSelect}>
        {isViewMode ? 'Select' : 'Remove'}
      </SelectButton>
    </Container>
  )
}

const Talent = ({ editable, name, base }) => {
  const { talentLevel, setTalent, data } = useContext(ItemsContext)
  const [level, setLevel] = useState(talentLevel)
  const checkInput = () => {
    if (level < 1 || level > 15) {
      setLevel(talentLevel)
    } else {
      setTalent(level)
    }
  }
  const handleInput = ({ target }) => {
    setLevel(target.value)
  }

  const handleButtons = operation => {
    const newLevel =
      operation === 'increase' ? talentLevel + 1 : talentLevel - 1
    setTalent(newLevel)
    setLevel(newLevel)
  }

  return (
    <TalentContainer>
      <span className='talentName'>{name}</span>
      <span className='talentData'>
        {editable ? (
          <span className='talentLvl'>
            <Icon
              negative
              onClick={() => handleButtons('decrease')}
              disabled={talentLevel < 2}
            />
            Lvl.
            <input
              type='number'
              onChange={e => handleInput(e)}
              onBlur={checkInput}
              value={level}
            />
            <Icon
              onClick={() => handleButtons('increase')}
              disabled={talentLevel === data.talentLevelMultipliers.length}
            />
          </span>
        ) : (
          <span className='talentLvl'>Lvl. {talentLevel}</span>
        )}
        <span className='talentDMG'>
          {(data.talentLevelMultipliers[talentLevel - 1] * base).toFixed(1)}%
          ATK
        </span>
      </span>
    </TalentContainer>
  )
}

const Icon = ({ negative = false, disabled = false, ...otherProps }) =>
  negative ? (
    <IconButton negative disabled={disabled} {...otherProps}>
      <FaMinus />
    </IconButton>
  ) : (
    <IconButton disabled={disabled} {...otherProps}>
      <FaPlus />
    </IconButton>
  )
