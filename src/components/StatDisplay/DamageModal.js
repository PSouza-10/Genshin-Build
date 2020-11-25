import React, { useContext, useState } from 'react'
import ENEMIES from '../../StatContext/enemies.json'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { MainStat, DamageModalContainer, Overlay } from './styles'
import styled, { css } from 'styled-components'
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import { StatContext } from '../../StatContext'
export default function DamageModal({ damage, open, handleDamageModal }) {
  const { enemy, handleEnemy } = useContext(StatContext)
  const { normal, crit } = damage

  const [inputControl, setInput] = useState(enemy.level)
  const [enemyListOpen, setEnemyList] = useState(false)
  const handleEnemyList = () => setEnemyList(!enemyListOpen)

  const handleInput = ({ target }) => {
    setInput(parseInt(target.value))
  }

  const handleEnemyLevel = operation => {
    let newLevel = operation === 'increase' ? enemy.level + 1 : enemy.level - 1
    setInput(newLevel)
    handleEnemy(enemy.name, newLevel)
  }

  const handleUnfocus = () => {
    if (inputControl > 0 && inputControl < 101) {
      handleEnemy(enemy.name, inputControl)
    } else {
      setInput(enemy.level)
    }
  }
  const selectEnemy = name => {
    handleEnemy(name, enemy.level)
  }

  const enemyDisplayName =
    window.innerWidth < 577 && enemy.name.length >= 10
      ? enemy.name.slice(0, 9) + '...'
      : enemy.name
  return (
    <>
      <Overlay overlayIsVisible={open} onClick={handleDamageModal} />

      <DamageModalContainer open={open}>
        <div className='header'>
          <h1>Damage</h1>
          <span className='layoutControl' onClick={handleDamageModal}>
            <MdClose />
          </span>
        </div>
        <div className='column'>
          <EnemyRow>
            <div className='enemyControl' onClick={handleEnemyList}>
              <span className='selectedEnemy'>
                {enemyDisplayName} <MdKeyboardArrowDown className='arrow' />
              </span>
              <EnemyList open={enemyListOpen}>
                {Object.keys(ENEMIES).map(name => (
                  <EnemyListItem
                    selected={name === enemy.name}
                    onClick={() => selectEnemy(name)}
                    key={name}>
                    {name}
                  </EnemyListItem>
                ))}
              </EnemyList>
            </div>
            <div className='enemyLevel'>
              <AddStatButton
                onClick={() => handleEnemyLevel('decrease')}
                value='negative'
                disabled={enemy.level === 1}>
                <FaMinus />
              </AddStatButton>
              <span className='enemyLevelControl'>
                Lvl.
                <input
                  value={inputControl}
                  onChange={e => handleInput(e)}
                  onBlur={handleUnfocus}
                  type='number'></input>
              </span>
              <AddStatButton
                onClick={() => handleEnemyLevel('increase')}
                value='positive'
                disabled={enemy.level === 100}>
                <FaPlus />
              </AddStatButton>
            </div>
          </EnemyRow>
          <ul className='enemyRES'>
            {Object.keys(enemy)
              .filter(key => !['level', 'name', 'Notes'].includes(key))
              .map(key => (
                <li key={key}>
                  +{key.replace('%', '')}: {enemy[key] + '%'}
                </li>
              ))}
            {enemy['Notes'] && <li>Note: {enemy['Notes']} </li>}
          </ul>
          <MainStat>Damage {normal}</MainStat>
          <MainStat>Crit Damage {crit}</MainStat>
        </div>
      </DamageModalContainer>
    </>
  )
}

export const AddStatButton = styled.button`
  border-radius: 50%;
  background-color: var(--primary);
  fill: var(--bgSecondary);
  cursor: pointer;
  padding: 3px;
  display: flex;
  align-self: center;
  margin-left: 6px;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  svg {
    width: 12px;
    height: 12px;
    fill: inherit;
  }
  &:hover {
    background-color: ${({ value }) => `var(--${value})`};
    fill: white;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      filter: brightness(60%);
      &:hover {
        background-color: var(--primary);
        fill: var(--bgPrimary);
      }
    `}
`

const EnemyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bgPrimary);
  padding: 5px 20px;

  .enemyControl {
    position: relative;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    max-height: 100%;
    flex: 0.3;
    .selectedEnemy {
      font-size: 1.3rem;
      position: relative;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      fill: var(--primary);
      padding: 0 5px;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background-color: var(--primary);
        color: var(--bgPrimary);
        fill: var(--bgPrimary);
      }
      .arrow {
        fill: inherit;
        transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: transform 0.2s ease;
      }
    }
  }

  div.enemyLevel {
    display: flex;
    justify-content: space-between;

    flex-basis: 20%;
    @media (max-width: 576px) {
      flex: 0.8;
    }
  }
  span.enemyLevelControl {
    font-size: 1.5rem;
    display: flex;
    padding: 0 3px;
    input {
      background-color: transparent;
      border: none;
      width: 42px;
      text-align: center;
      font-size: 1.5rem;
    }
  }
`

const EnemyList = styled.ul`
  height: ${({ open }) => (open ? '160px' : '0')};
  transition: height 0.2s ease;
  background-color: var(--bgPrimary);
  list-style: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 27px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const EnemyListItem = styled.li`
  background-color: ${({ selected }) =>
    selected ? 'var(--primary)' : 'inherit'};
  color: ${({ selected }) => (selected ? 'var(--bgPrimary)' : 'inherit')};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${({ selected }) =>
      selected ? 'var(--primary)' : 'var(--bgSecondary)'};
  }
`
