import React, { createContext, useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../ItemsContext'
import {
  calculateCharacterAtk,
  createNewArtifacts,
  calculateWeaponStats,
  calculateAtkPower
} from './statCalculations'
const initialState = {
  damage: 0,
  weaponAtk: 0,
  characterAtk: 0
}

const generateInitialArtifactState = (selectedItems = {}) => {
  const { character, view, weapon, ...artifacts } = selectedItems

  let returnObj = {}
  Object.keys(artifacts).map(key => {
    const { id, level, stars } = artifacts[key]

    returnObj[key] = {
      id,
      level,
      upgrade: stars,
      main: 0,
      sub: []
    }
    return level
  })
  return returnObj
}
const calculateTotalAtkPerc = artifacts => {
  let total = 0
  const artifactsAtkCopy = Object.assign({}, artifacts)
  Object.keys(artifactsAtkCopy).map(key => {
    if (!['plume', 'flower'].includes(key)) {
      total += artifactsAtkCopy[key].main
    }
    return key
  })

  return (Math.round(total * 100) / 100).toFixed(1)
}
export const StatContext = createContext(initialState)

export default function StatProvider({ children }) {
  const { selectedItems } = useContext(ItemsContext)
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

  useEffect(() => {
    const newArtifacts = createNewArtifacts(artifactsAtk, selectedItems)
    setArtifactAtk(newArtifacts)
    setTotalAtkPerc(calculateTotalAtkPerc(newArtifacts))
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
      setWeaponAtk({
        main,
        sub,
        subType: weapon.secondaryStat
      })
    } else {
      setWeaponAtk({
        main: 0,
        sub: 0,
        subType: 0
      })
    }
  }, [weapon])
  return (
    <StatContext.Provider
      value={{ characterAtk, weaponAtk, artifactsAtk, totalAtkPerc, totalAtk }}>
      {children}
    </StatContext.Provider>
  )
}

// {
//   flower : {
//     main : 0,
//     sub: [],
//     lvl: flower.level
//   },
//   plume  : {
//     main : 0,
//     sub: [],
//     lvl: plume.level
//   },
//   sands  : {
//     main : 0,
//     sub: [],
//     lvl: sands.level
//   },
//   goblet : {
//     main : 0,
//     sub: [],
//     lvl: goblet.level
//   },
//   circlet: {
//     main : 0,
//     sub: [],
//     lvl: circlet.level
//   },
// }
