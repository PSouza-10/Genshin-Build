import React, { createContext, useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../ItemsContext'
import {
  calculateCharacterStats,
  createNewArtifacts,
  calculateWeaponStats,
  calculateAtkPower,
  calculateDamage,
  calculateTotalFlatATK,
  calculateTotalAtkPerc
} from './statCalculations'

import {
  returnNewSubStats,
  generateInitialArtifactState
} from './statControlFunctions'

const initialState = {
  damage: 0,
  weaponAtk: 0,
  characterStats: {
    HP: 0,
    'CRIT Rate%': 0,
    'CRIT DMG%': 0.5,
    ATK: 0,
    DEF: 0,
    'Elemental Mastery': 0,
    'Energy Recharge': 0,
    'Elemental DMG%': 0
  }
}

export const StatContext = createContext(initialState)

export default function StatProvider({ children }) {
  const { selectedItems, talentLevel, data } = useContext(ItemsContext)
  const { character, weapon } = selectedItems

  const [characterStats, setCharacterStats] = useState(
    initialState.characterStats
  )
  const [artifactsAtk, setArtifactAtk] = useState(
    generateInitialArtifactState(selectedItems)
  )
  const [flatAtkBonus, setFlatAtk] = useState(0)
  const [weaponAtk, setWeaponAtk] = useState({
    main: 0,
    sub: 0,
    subType: ''
  })
  const [totalAtkPerc, setTotalAtkPerc] = useState(0)

  const [totalAtk, setTotalAtk] = useState(0)
  const [damage, setDamage] = useState({
    crit: 0,
    normal: 0
  })
  const [enemyLevel, setEnemyLevel] = useState(character.level)

  useEffect(() => {
    const newArtifacts = createNewArtifacts(artifactsAtk, selectedItems)
    setArtifactAtk(newArtifacts)

    setFlatAtk(newArtifacts.plume.main)
    //eslint-disable-next-line
  }, [selectedItems, setArtifactAtk])

  useEffect(() => {
    if (character.id) {
      const newAtk = calculateCharacterStats(character)
      setCharacterStats(newAtk)
    } else {
      setCharacterStats(initialState.characterStats)
    }
  }, [character])

  useEffect(() => {
    setTotalAtk(
      calculateAtkPower(
        characterStats,
        weaponAtk.main,
        flatAtkBonus,
        totalAtkPerc
      )
    )
  }, [totalAtkPerc, flatAtkBonus, characterStats, weaponAtk])

  useEffect(() => {
    if (weapon.id) {
      const { main, sub } = calculateWeaponStats(weapon)
      const newWeaponStats = {
        main,
        sub,
        subType: weapon.secondaryStat
      }
      setWeaponAtk(newWeaponStats)
    } else {
      setWeaponAtk({
        main: 0,
        sub: 0,
        subType: 0
      })
    }
    //eslint-disable-next-line
  }, [weapon])

  useEffect(() => {
    setTotalAtkPerc(
      calculateTotalAtkPerc(artifactsAtk, weaponAtk, characterStats)
    )
  }, [weaponAtk, artifactsAtk, characterStats])

  useEffect(() => {
    setDamage(
      calculateDamage(
        totalAtk,
        talentLevel,
        artifactsAtk,
        characterStats,
        weaponAtk,
        character,
        enemyLevel
      )
    )

    //eslint-disable-next-line
  }, [
    totalAtk,
    talentLevel,
    data.talents,
    enemyLevel,
    artifactsAtk,
    characterStats
  ])
  function setMainStat(slot = 'sands', stat = 'ATK%') {
    const withNewStat = {
      ...artifactsAtk,
      [slot]: {
        ...artifactsAtk[slot],
        mainType: stat
      }
    }
    const newArtifacts = createNewArtifacts(withNewStat, selectedItems)
    setArtifactAtk(newArtifacts)
  }

  useEffect(() => {
    const newFlatATK = calculateTotalFlatATK(artifactsAtk)
    setFlatAtk(newFlatATK)
  }, [artifactsAtk, setFlatAtk])

  function handleSubStats(action, value, slot, subStatIndex = 0) {
    const newSubStats = returnNewSubStats(
      action,
      artifactsAtk[slot].sub,
      value,
      subStatIndex
    )

    setArtifactAtk(previousValue => {
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
        weaponAtk,
        artifactsAtk,
        totalAtkPerc,
        totalAtk,
        flatAtkBonus,
        damage,
        enemyLevel,
        setMainStat,
        handleSubStats,
        setArtifactAtk,
        setEnemyLevel
      }}>
      {children}
    </StatContext.Provider>
  )
}
