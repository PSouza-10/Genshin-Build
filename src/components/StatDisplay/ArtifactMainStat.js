import React, { useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { StatContext } from '../../StatContext'

export default function ArtifactMainStat({ slot, mainStatIsEditable }) {
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

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: 1.4rem;
  z-index: 7;
  margin: 12px 12px;
`

const ArrowIcon = styled(MdKeyboardArrowDown)`
  fill: inherit;
  transition: transform 0.2s ease;
  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`
const Bar = styled.div`
  position: relative;
  z-index: 7;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 12px;

  justify-content: space-between;
  align-items: center;
  background-color: var(--bgPrimary);

  font-weight: 550;

  .close {
    display: flex;
    fill: var(--primary);
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      fill: white;
    }
  }
`
const Items = styled.ul`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  max-height: ${({ open }) => (open ? '250px' : '0')};
  overflow: ${({ open }) => (open ? 'scroll' : 'hidden')};
  color: ${({ open }) => (open ? 'var(--primary)' : 'rgba(0,0,0,0)')};
  transition: all 0.3s ease;
  background-color: var(--bgPrimary);
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
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
