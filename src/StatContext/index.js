import React, { createContext, useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../ItemsContext'
import {
  calculateCharacterAtk,
  createNewArtifacts,
  calculateWeaponStats,
  calculateAtkPower,
  calculateDamage
} from './statCalculations'
const initialState = {
  damage: 0,
  weaponAtk: 0,
  characterAtk: 0
}

const generateInitialArtifactState = (selectedItems = {}) => {
  const { character, view, weapon, ...artifacts } = selectedItems

  let returnObj = {}
  const initialStatMap = {
    flower: 'HP',
    plume: 'ATK'
  }
  Object.keys(artifacts).forEach(key => {
    const { id, level, stars } = artifacts[key]

    const mainType = Object.keys(initialStatMap).includes(key)
      ? initialStatMap[key]
      : 'ATK%'
    returnObj[key] = {
      id,
      level,
      upgrade: stars,
      main: 0,
      sub: [],
      mainType
    }
  })
  return returnObj
}
const calculateTotalAtkPerc = (artifacts, weaponAtk) => {
  let total = 0
  const artifactsAtkCopy = Object.assign({}, artifacts)
  Object.keys(artifactsAtkCopy).forEach(key => {
    if (
      !['plume', 'flower'].includes(key) &&
      artifactsAtkCopy[key].mainType === 'ATK%'
    ) {
      total += artifactsAtkCopy[key].main
    }
  })

  if (weaponAtk.subType === 'ATK') {
    total += weaponAtk.sub
  }

  return (Math.round(total * 100) / 100).toFixed(1)
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
  const [damage, setDamage] = useState(0)
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
    const { id, talent } = selectedItems.character
    if (id) {
      setDamage(
        calculateDamage(totalAtk, data.talents[talent][talentLevel - 1])
      )
    }
  }, [totalAtk, talentLevel, data.talents, selectedItems])
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

  return (
    <StatContext.Provider
      value={{
        characterAtk,
        weaponAtk,
        artifactsAtk,
        totalAtkPerc,
        totalAtk,
        damage,
        setMainStat
      }}>
      {children}
    </StatContext.Provider>
  )
}
