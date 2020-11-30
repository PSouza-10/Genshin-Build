import React, { useState, useContext } from 'react'
import { MainStat } from '../styles'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { ItemsContext } from '../../../ItemsContext'
import { TalentContainer, IconButton } from './styles'
import { StatContext } from '../../../StatContext'
import { StatTableColumn, Stat } from '../AllStatsModal/styles'

export default function CharacterView({ item, isViewMode, itemInfo }) {
  const { characterStats } = useContext(StatContext)
  const statList = [
    ...Object.keys(isViewMode ? item.stats : characterStats)
  ].filter(name => name !== 'ATK')

  return (
    <>
      <a href={item.pageUrl} className='title'>
        {item.name}
      </a>
      <MainStat>{itemInfo.mainStat}</MainStat>
      <Talent
        name={item.talent}
        base={item.talentBase}
        editable={!isViewMode}
      />
      <MainStat style={{ textAlign: 'center' }}>
        {isViewMode ? 'Stats at Level 1' : 'Stats'}
      </MainStat>
      <StatTableColumn style={{ margin: '0 auto' }}>
        {statList.map((stat, index) => {
          let value = isViewMode ? item.stats[stat].base : characterStats[stat]

          return (
            <Stat even={index % 2 === 0}>
              <span>{stat.replace('%', '')}</span>
              <span>
                {stat.includes('%')
                  ? value.toFixed(2) + '%'
                  : Math.round(value)}
              </span>{' '}
            </Stat>
          )
        })}
      </StatTableColumn>
    </>
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
          <span className='talentLvl'>Lvl. {1}</span>
        )}
        <span className='talentDMG'>
          {editable
            ? (data.talentLevelMultipliers[talentLevel - 1] * base).toFixed(1)
            : base}
          % ATK
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
