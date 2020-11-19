import React, { createContext, useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../ItemsContext'
import {
  calculateCharacterStats,
  createNewArtifacts,
  calculateWeaponStats,
  calculateStats,
  calculateDamage
} from './statCalculations'

import {
  returnNewSubStats,
  generateInitialArtifactState
} from './statControlFunctions'

const initialState = {
  damage: 0,
  weaponStats: 0,
  characterStats: {
    HP: 0,
    'CRIT Rate%': 5,
    'CRIT DMG%': 50,
    ATK: 0,
    DEF: 0,
    'Elemental Mastery': 0,
    'Energy Recharge%': 100,
    'Elemental DMG%': 0,
    'Physical DMG%': 0
  }
}

export const StatContext = createContext(initialState)

export default function StatProvider({ children }) {
  const { selectedItems, talentLevel, didMount } = useContext(ItemsContext)
  const { character, weapon } = selectedItems

  const [characterStats, setCharacterStats] = useState(
    initialState.characterStats
  )
  const [artifactStats, setArtifactStats] = useState(
    generateInitialArtifactState(selectedItems)
  )

  const [weaponStats, setWeaponStats] = useState({
    main: 0,
    sub: 0,
    subType: ''
  })

  const [calculatedStats, setCalculatedStats] = useState({
    HP: 0,
    ATK: 0,
    DEF: 0,
    'Energy Recharge%': 0,
    'CRIT Rate%': 0,
    'CRIT DMG%': 0,
    'Elemental DMG%': 0,
    'Physical DMG%': 0,
    'Healing Bonus': 0
  })
  const [damage, setDamage] = useState({
    crit: 0,
    normal: 0
  })
  const [enemyLevel, setEnemyLevel] = useState(character.level)

  useEffect(() => {
    if (didMount()) {
      const newArtifacts = createNewArtifacts(artifactStats, selectedItems)
      setArtifactStats(newArtifacts)
    }
    //eslint-disable-next-line
  }, [selectedItems, setArtifactStats])

  useEffect(() => {
    if (character.id) {
      const newAtk = calculateCharacterStats(character)
      setCharacterStats(newAtk)
    } else {
      setCharacterStats(initialState.characterStats)
    }
  }, [character])

  useEffect(() => {
    setCalculatedStats(
      calculateStats(characterStats, weaponStats, artifactStats)
    )
  }, [characterStats, weaponStats, artifactStats])

  useEffect(() => {
    if (weapon.id) {
      const { main, sub } = calculateWeaponStats(weapon)
      const newWeaponStats = {
        main,
        sub,
        subType: weapon.secondaryStat
      }
      setWeaponStats(newWeaponStats)
    } else {
      setWeaponStats({
        main: 0,
        sub: 0,
        subType: 0
      })
    }
    //eslint-disable-next-line
  }, [weapon])

  useEffect(() => {
    setDamage(
      calculateDamage(calculatedStats, talentLevel, character, enemyLevel)
    )

    //eslint-disable-next-line
  }, [talentLevel, enemyLevel, calculatedStats, character])
  function setMainStat(slot = 'sands', stat = 'ATK%') {
    const withNewStat = {
      ...artifactStats,
      [slot]: {
        ...artifactStats[slot],
        mainType: stat
      }
    }
    const newArtifacts = createNewArtifacts(withNewStat, selectedItems)
    setArtifactStats(newArtifacts)
  }

  function handleSubStats(action, value, slot, subStatIndex = 0) {
    const newSubStats = returnNewSubStats(
      action,
      artifactStats[slot].sub,
      value,
      subStatIndex
    )

    setArtifactStats(previousValue => {
      return {
        ...previousValue,
        [slot]: {
          ...previousValue[slot],
          sub: newSubStats
        }
      }
    })
  }

  return (
    <StatContext.Provider
      value={{
        characterStats,
        weaponStats,
        artifactStats,
        calculatedStats,
        damage,
        enemyLevel,
        setMainStat,
        handleSubStats,
        setArtifactStats,
        setEnemyLevel
      }}>
      {children}
    </StatContext.Provider>
  )
}
