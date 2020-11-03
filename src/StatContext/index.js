import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { ItemsContext } from '../ItemsContext'
import {
  calculateCharacterAtk,
  calculateArtifactStats
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
export const StatContext = createContext(initialState)

export default function StatProvider({ children }) {
  const { selectedItems } = useContext(ItemsContext)
  const { character } = selectedItems

  const [characterAtk, setCharacterAtk] = useState(0)
  const [artifactsAtk, setArtifactAtk] = useState(
    generateInitialArtifactState(selectedItems)
  )
  const updateArtifacts = useCallback(() => {
    Object.keys(selectedItems).map(key => {
      if (
        selectedItems[key].id &&
        !['view', 'character', 'weapon'].includes(key)
      ) {
        const { level, stars, id } = selectedItems[key]
        const {
          level: currentLevel,
          stars: currentStars,
          id: currentId
        } = artifactsAtk[key]

        if (
          level !== currentLevel ||
          stars !== currentStars ||
          id !== currentId
        ) {
          const { newMain, newSub } = calculateArtifactStats(selectedItems[key])

          setArtifactAtk(previous => {
            return {
              ...previous,
              [key]: {
                ...previous[key],
                level,
                upgrade: stars,
                id,
                main: newMain,
                sub: newSub
              }
            }
          })
        }
      }
      return null
    })
  }, [selectedItems, artifactsAtk])
  useEffect(() => {
    updateArtifacts()
  }, [selectedItems, updateArtifacts])

  useEffect(() => {
    if (character.id) {
      const newAtk = calculateCharacterAtk(character)
      setCharacterAtk(newAtk)
    }
  }, [character])

  return (
    <StatContext.Provider value={{ characterAtk, artifactsAtk }}>
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
