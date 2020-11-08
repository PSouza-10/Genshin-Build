import React, { useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { StatContext } from '../../StatContext'
export default function ArtifactMainStat({ slot }) {
  const { artifactsAtk, setMainStat } = useContext(StatContext)
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  const slotKey = slot.toLowerCase().split(' ')[0]
  const mainStatIsEditable = !['flower', 'plume'].includes(slotKey)
  const uniqueStats = {
    'Sands of Eon': ['Energy Recharge%'],
    'Goblet of Eonothem': ['Elemental DMG%', 'Physical DMG%'],
    'Circlet of Logos': ['Crit DMG%', 'Crit Rate%', 'Healing Bonus%']
  }

  const handleSelect = value => {
    setMainStat(slotKey, value)
    toggle()
  }

  let possibleStats = ['ATK%', 'HP%', 'DEF%', 'Elemental Mastery']

  if (Object.keys(uniqueStats).includes(slot)) {
    possibleStats = [...possibleStats, ...uniqueStats[slot]]
  }

  return (
    <Wrapper>
      <Bar
        onClick={() => mainStatIsEditable && toggle()}
        open={open}
        isEditable={mainStatIsEditable}>
        <span>{`${artifactsAtk[slotKey].mainType} ${artifactsAtk[slotKey].main}`}</span>

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
              selected={artifactsAtk[slotKey].mainType === item}
              onClick={() => handleSelect(item)}>
              {item}
            </Item>
          ))}
        </Items>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: var(--bgPrimary);
  margin: 20px 20px;
  max-height: 72px;
  font-size: 1.4rem;
  z-index: 7;
`

const ArrowIcon = styled(MdKeyboardArrowDown)`
  height: 30px;
  width: 30px;
  fill: inherit;
  transition: transform 0.2s ease;
  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`
const Bar = styled.div`
  position: absolute;
  z-index: 7;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 25px 15px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bgPrimary);
  .close {
    display: ${({ isEditable }) => !isEditable && 'none'};
    fill: var(--primary);
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      fill: white;
    }
  }

  ${({ open }) =>
    open &&
    css`
      .close {
        display: initial;
      }
    `}
`
const Items = styled.ul`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  height: ${({ open }) => (open ? '250px' : '0')};
  overflow: scroll;
  color: ${({ open }) => (open ? 'var(--primary)' : 'rgba(0,0,0,0)')};
  transition: all 0.3s ease;
  background-color: var(--bgPrimary);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 55px;
  z-index: 6;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Item = styled.li`
  padding: 5px 0;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: var(--bgSecondary);
  }

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 560;
      background-color: var(--primary);
      color: var(--bgSecondary);
      &:hover {
        font-weight: 560;
        background-color: var(--primary);
        color: var(--bgSecondary);
      }
    `}
`
