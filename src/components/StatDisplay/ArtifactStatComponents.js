import React, { useState, useContext } from 'react'
import {
  ArrowIcon,
  Bar,
  Item,
  Items,
  Wrapper,
  SubStatsWrapper,
  SubStatDropdown,
  PlusIcon,
  AddStatButton,
  Stat,
  DeleteStat
} from './ArtifactStyles'
import { StatContext } from '../../StatContext'

export function ArtifactMainStat({ slot, mainStatIsEditable }) {
  const { artifactsAtk, setMainStat } = useContext(StatContext)
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }

  const uniqueStats = {
    sands: ['Energy Recharge%'],
    goblet: ['Elemental DMG%', 'Physical DMG%'],
    circlet: ['Crit DMG%', 'Crit Rate%', 'Healing Bonus%']
  }

  const handleSelect = value => {
    setMainStat(slot, value)
    toggle()
  }

  let possibleStats = ['ATK%', 'HP%', 'DEF%', 'Elemental Mastery']

  if (Object.keys(uniqueStats).includes(slot)) {
    possibleStats = [...possibleStats, ...uniqueStats[slot]]
  }

  const { main, mainType } = artifactsAtk[slot]
  return (
    <Wrapper>
      <Bar
        onClick={() => mainStatIsEditable && toggle()}
        open={open}
        isEditable={mainStatIsEditable}>
        <span>{`${mainType} ${main}`}</span>

        {
          <span className='close' onClick={toggle}>
            <ArrowIcon open={open} />
          </span>
        }
      </Bar>
      {mainStatIsEditable && (
        <Items open={open}>
          {possibleStats.map((item, index) => (
            <Item
              key={index}
              selected={mainType === item}
              onClick={() => handleSelect(item)}>
              {item}
            </Item>
          ))}
        </Items>
      )}
    </Wrapper>
  )
}

export function ArtifactSubStats({ slot, mainStatType }) {
  const { handleSubStats, artifactsAtk } = useContext(StatContext)
  const [openSubStat, setOpen] = useState(5)

  const statTypes = [
    'HP',
    'HP%',
    'ATK',
    'ATK%',
    'DEF',
    'DEF%',
    'CRIT Rate%',
    'CRIT DMG%',
    'Elemental Mastery',
    'Energy Recharge'
  ]

  const changeStat = (newType, index) => {
    handleSubStats(
      'edit',
      {
        type: newType,
        value: 10.0
      },
      slot,
      index
    )
  }
  const deleteStat = index => {
    handleSubStats('remove', {}, slot, index)
    setOpen(7)
  }
  const addSubStat = () => {
    const newStatType = statTypes.find(type => type !== mainStatType)
    const newSubStat = {
      type: newStatType,
      value: 10.0
    }
    handleSubStats('add', newSubStat, slot)
  }

  const handleOpen = index => {
    if (openSubStat === index) {
      setOpen(5)
    } else {
      setOpen(index)
    }
  }

  const subStats = artifactsAtk[slot].sub

  const currentStatsType = subStats.map(({ type }) => type)
  return (
    <>
      <span
        style={{ paddingLeft: '15px', display: 'flex', alignItems: 'center' }}>
        <h1>Sub Stats </h1>
        <AddStatButton disabled={subStats.length === 4} onClick={addSubStat}>
          <PlusIcon />
        </AddStatButton>
      </span>
      <SubStatsWrapper>
        {subStats.map(({ type, value }, index) => (
          <SubStatDropdown open={openSubStat === index}>
            <span className='selected' onClick={() => handleOpen(index)}>
              <PlusIcon style={{ marginRight: '15px' }} />
              <span className='dropdownControl'>
                {' '}
                <h3>{type}</h3>
                <ArrowIcon open={openSubStat === index} />
              </span>
              <span className='value'>{value + '%'}</span>
              <span className='buttons'></span>
            </span>
            <DeleteStat onClick={() => deleteStat(index)} />
            <ul className='statList'>
              {statTypes.map(
                stat =>
                  stat !== mainStatType &&
                  !currentStatsType.includes(stat) && (
                    <Stat
                      selected={stat === type}
                      onClick={() => changeStat(stat, index)}>
                      {stat}
                    </Stat>
                  )
              )}
            </ul>
          </SubStatDropdown>
        ))}
      </SubStatsWrapper>
    </>
  )
}
