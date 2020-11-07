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

import { FaMinus, FaPlus } from 'react-icons/fa'

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
      {type === 'Character' && <Talent name={item.talent} editable={true} />}
      {type === 'Weapon' && item.passive !== 'None' && (
        <>
          <h3 className='passiveName'>{item.passive}</h3>
          <p className='passiveDescription'>{data.passives[item.passive]}</p>
        </>
      )}
      {window.innerWidth < 576 && (
        <SelectButton onClick={handleSelect}>Select</SelectButton>
      )}
    </Container>
  )
}

const Talent = ({ editable, name }) => {
  const { talentLevel, setTalent, data } = useContext(ItemsContext)
  const [level, setlevel] = useState(talentLevel)
  const checkInput = () => {
    if (level < 1 || level > 15) {
      setlevel(talentLevel)
    } else {
      setTalent(level)
    }
  }
  const handleInput = ({ target }) => {
    setlevel(target.value)
  }

  const handleButtons = operation => {
    const newLevel =
      operation === 'increase' ? talentLevel + 1 : talentLevel - 1
    setTalent(newLevel)
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
              disabled={talentLevel > 14}
            />
          </span>
        ) : (
          <span className='talentLvl'>{talentLevel}</span>
        )}
        <span className='talentDMG'>
          {data.talents[name][talentLevel - 1]}% ATK
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
