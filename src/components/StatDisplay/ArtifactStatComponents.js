import React, { useState, useContext, useEffect } from 'react'
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
  const subStats = artifactsAtk[slot].sub
  const currentStatsType = subStats.map(({ type }) => type)
  const [inputData, setInputData] = useState(subStats)

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
    'Energy Recharge%'
  ]
  useEffect(() => {
    setInputData(subStats)
  }, [subStats])
  const handleInputChange = (index, { target: { value = '0' } }) => {
    let newValue = 0

    newValue = parseFloat(value)

    let dataCopy = [...inputData]
    dataCopy[index] = {
      ...dataCopy[index],
      value: newValue
    }

    setInputData(dataCopy)
  }
  const checkInput = index => {
    const { type, value } = inputData[index]

    if (value) {
      changeStat(type, index, value)
    } else {
      setInputData(subStats)
    }
  }
  const changeStat = (newType, index, newValue = 10.0) => {
    handleSubStats(
      'edit',
      {
        type: newType,
        value: newValue
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
    const newStatType = statTypes.find(
      type => type !== mainStatType && !currentStatsType.includes(type)
    )
    const newSubStat = {
      type: newStatType,
      value: 10.0
    }
    setInputData([...inputData, newSubStat])
    handleSubStats('add', newSubStat, slot)
  }

  const handleOpen = index => {
    if (openSubStat === index) {
      setOpen(5)
    } else {
      setOpen(index)
    }
  }
  const maxNumberTable = [1, 2, 4, 4, 4]
  const maxNumberOfSubStats = maxNumberTable[artifactsAtk[slot].upgrade - 1]
  return (
    <>
      <span
        style={{ paddingLeft: '15px', display: 'flex', alignItems: 'center' }}>
        <h1>Sub Stats </h1>
        <AddStatButton
          disabled={subStats.length === maxNumberOfSubStats}
          onClick={addSubStat}>
          <PlusIcon />
        </AddStatButton>
      </span>
      <SubStatsWrapper>
        {inputData.map(({ type, value }, index) => (
          <SubStatDropdown open={openSubStat === index} key={index}>
            <span className='selected'>
              <PlusIcon style={{ marginRight: '15px' }} />
              <span
                className='dropdownControl'
                onClick={() => handleOpen(index)}>
                {' '}
                <h3>{type}</h3>
                <ArrowIcon open={openSubStat === index} />
              </span>
              <input
                className='value'
                type='number'
                value={inputData[index].value.toString()}
                onChange={e => handleInputChange(index, e)}
                onBlur={() => checkInput(index)}></input>
              {type.includes('%') && <span className='value'>%</span>}

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
                      onClick={() => changeStat(stat, index, value)}
                      key={stat}>
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