import React, { createContext, useState } from 'react'
import meta from './data.json'
import artifactSets from './artifactSets.json'
import weaponTypes from './weaponTypes.json'
import weapons from './weapons.json'
import characters from './characters.json'
import artifacts from './artifacts.json'
import { formatSlot } from './utils'

const data = {
  ...meta,
  artifactSets: artifactSets,
  weaponTypes: weaponTypes,
  weapons: weapons,
  characters: characters,
  artifacts: artifacts
}

const initialState = {
  data: {
    ...data
  },

  selectedItems: {
    flower: {
      level: 0
    },
    plume: { level: 0 },
    sands: { level: 0 },
    goblet: { level: 0 },
    circlet: { level: 0 },
    character: { level: 1 },
    weapon: { level: 1 }
  },
  view: {}
}
export const ItemsContext = createContext(initialState)

export default function ItemsProvider({ children }) {
  const [selectedItems, selectItem] = useState(initialState.selectedItems)
  const [displayedItem, setDisplayed] = useState('stats')
  const [view, setView] = useState(initialState.view)
  const handleSelectItem = (item = {}) => {
    const slot = formatSlot(item.type === 'Artifact' ? item.slot : item.type)

    if (selectedItems[slot].id === item.id) {
      selectItem({
        ...selectedItems,
        [slot]: {
          level: 0,
          ascension: 0,
          stars: 1
        }
      })
      if (displayedItem === slot) {
        setDisplayed('stats')
      }
    } else {
      const selected = selectedItems[slot]
      if (item.type === 'Artifact') {
        const { minRarity, maxRarity } = initialState.data.artifactSets[
          item.set
        ]
        const currentLevel = selected.level
        const currentStars =
          selected.stars > maxRarity || selected.stars < minRarity
            ? minRarity
            : selected.stars || minRarity
        const maxLevel = currentStars > 2 ? currentStars * 4 : 4

        selectItem({
          ...selectedItems,
          [slot]: {
            ...selected,
            ...item,
            stars: currentStars,
            maxLevel: maxLevel,
            level: currentLevel > maxLevel ? maxLevel : currentLevel,
            minRarity,
            maxRarity
          }
        })
      } else {
        const ascensionTable = [20, 40, 50, 60, 70, 80, 90]

        const currentLevel = selected.level
        const currentAscension = selected.ascension || 0
        selectItem({
          ...selectedItems,
          [slot]: {
            ...selected,
            ...item,
            level: currentLevel || 1,
            ascension: currentAscension,
            maxLevel: ascensionTable[currentAscension]
          }
        })
      }
      setDisplayed(slot)
    }
  }

  const handleItemDisplay = (item = {}, view = false) => {
    const slot = formatSlot(item.type === 'Artifact' ? item.slot : item.type)
    if (view) {
      let value = { ...item }
      if (item.type === 'Artifact') {
        const { minRarity, maxRarity } = initialState.data.artifactSets[
          item.set
        ]
        value = { ...value, minRarity, maxRarity }
      }
      setView(value)
      setDisplayed('view')
    } else {
      setDisplayed(slot)
    }
  }
  function setStats(slot, { level = 0, ascension = null, stars }) {
    const selected = selectedItems[slot]
    if (['character', 'weapon'].includes(slot)) {
      const ascensionTable = [1, 20, 40, 50, 60, 70, 80, 90]

      let newLevel = selected.level
      let newAscension = selected.ascension

      if (
        (![newAscension].includes(ascension) && ascension) ||
        ascension === 0
      ) {
        newAscension = ascension
        newLevel = ascensionTable[ascension]
      }

      selectItem({
        ...selectedItems,
        [slot]: {
          ...selected,
          level: level === 0 ? newLevel : level,
          ascension: newAscension,
          maxLevel: ascensionTable[newAscension === 6 ? 7 : newAscension + 1]
        }
      })
    } else {
      const starsTable = [0, 4, 4, 12, 16, 20]
      let maxLevel = selected.maxLevel
      let newLevel = level ? level : selected.level
      if (stars && (stars > selected.stars || stars < selected.stars)) {
        maxLevel = starsTable[stars]
        if (maxLevel < newLevel) {
          newLevel = maxLevel
        }
      }

      selectItem({
        ...selectedItems,
        [slot]: {
          ...selected,
          level: newLevel,
          stars: stars ? stars : selected.stars,
          maxLevel: maxLevel
        }
      })
    }
  }

  function clearItems() {
    selectItem(initialState.selectedItems)
  }
  return (
    <ItemsContext.Provider
      value={{
        ...initialState,
        selectedItems,
        displayedItem,
        view,
        handleSelectItem,
        clearItems,
        handleItemDisplay,
        setStats,
        formatSlot,
        setDisplayed
      }}>
      {children}
    </ItemsContext.Provider>
  )
}
