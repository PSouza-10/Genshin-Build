import React, { createContext, useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../ItemsContext'
import {
  calculateCharacterAtk,
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
  characterAtk: 0
}

export const StatContext = createContext(initialState)

export default function StatProvider({ children }) {
  const { selectedItems, talentLevel, data } = useContext(ItemsContext)
  const { character, weapon } = selectedItems

  const [characterAtk, setCharacterAtk] = useState(0)
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
      const newAtk = calculateCharacterAtk(character)
      setCharacterAtk(newAtk)
    } else {
      setCharacterAtk(0)
    }
  }, [character])

  useEffect(() => {
    setTotalAtk(
      calculateAtkPower(
        characterAtk,
        weaponAtk.main,
        flatAtkBonus,
        totalAtkPerc
      )
    )
  }, [totalAtkPerc, flatAtkBonus, characterAtk, weaponAtk])

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
    setTotalAtkPerc(calculateTotalAtkPerc(artifactsAtk, weaponAtk))
  }, [weaponAtk, artifactsAtk])

  useEffect(() => {
    const { talent, weapon, level } = selectedItems.character

    setDamage(
      calculateDamage(
        totalAtk,
        data.talents[talent || 'Sharpshooter'][talentLevel - 1],
        artifactsAtk,
        weapon,
        weaponAtk,
        level,
        enemyLevel
      )
    )

    //eslint-disable-next-line
  }, [
    totalAtk,
    talentLevel,
    data.talents,
    selectedItems,
    enemyLevel,
    artifactsAtk
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
        characterAtk,
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
