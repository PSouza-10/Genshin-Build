import React, { useState } from 'react'

import { FaPlus, FaMinus } from 'react-icons/fa'
import { MainStat, DamageModalContainer, Overlay } from './styles'
import styled, { css } from 'styled-components'
import { MdClose } from 'react-icons/md'
export default function DamageModal({
  enemyLevel = 0,
  setEnemyLevel,
  damage,
  open,
  handleDamageModal
}) {
  const { normal, crit } = damage
  const [inputControl, setInput] = useState(enemyLevel)
  const handleInput = ({ target }) => {
    setInput(parseInt(target.value))
  }

  const handleEnemyLevel = operation => {
    let newLevel = operation === 'increase' ? enemyLevel + 1 : enemyLevel - 1
    setInput(newLevel)
    setEnemyLevel(newLevel)
  }

  const handleUnfocus = () => {
    if (inputControl > 0 && inputControl < 101) {
      setEnemyLevel(inputControl)
    } else {
      setInput(enemyLevel)
    }
  }
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
          <MainStat className='enemyLevel'>
            <p>Enemy Level</p>

            <span>
              <AddStatButton
                onClick={() => handleEnemyLevel('decrease')}
                value='negative'>
                <FaMinus />
              </AddStatButton>
              <input
                value={inputControl}
                onChange={e => handleInput(e)}
                onBlur={handleUnfocus}
                type='number'></input>

              <AddStatButton
                onClick={() => handleEnemyLevel('increase')}
                value='positive'>
                <FaPlus />
              </AddStatButton>
            </span>
          </MainStat>
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
      }
    `}
`
