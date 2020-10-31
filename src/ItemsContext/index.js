import React, { createContext, useState } from 'react'
import meta from './data.json'
import artifactSets from './artifactSets.json'
import weaponTypes from './weaponTypes.json'
import weapons from './weapons.json'
import characters from './characters.json'
import artifacts from './artifacts.json'

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
      level: 1
    },
    plume: { level: 1 },
    sands: { level: 1 },
    goblet: { level: 1 },
    circlet: { level: 1 },
    character: { level: 1 },
    weapon: { level: 1 },
    view: {}
  }
}
export const ItemsContext = createContext(initialState)

export default function ItemsProvider({ children }) {
  const [selectedItems, selectItem] = useState(initialState.selectedItems)
  const [displayedItem, setDisplayed] = useState('view')
  const handleSelectItem = (item = {}, slot) => {
    if (slot && selectedItems[slot].id === item.id) {
      selectItem({
        ...selectedItems,
        [slot]: {
          level: 1,
          ascension: 0,
          stars: 1
        }
      })
    } else {
      const selected = selectedItems[slot]
      if (!['character', 'weapon'].includes(slot)) {
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
            level: currentLevel || 1,
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
    }
  }

  const handleItemDisplay = (slot, item = {}) => {
    if (slot === 'view') {
      let value = { ...item }
      if (!['Character', 'Weapon'].includes(item.type)) {
        const { minRarity, maxRarity } = initialState.data.artifactSets[
          item.set
        ]
        value = { ...value, minRarity, maxRarity }
      }
      selectItem({
        ...selectedItems,
        view: value
      })
      setDisplayed(slot)
    } else {
      setDisplayed(slot)
    }
  }
  function setStats(slot, { level, ascension, stars }) {
    const selected = selectedItems[slot]
    if (['character', 'weapon'].includes(slot)) {
      const ascensionTable = [20, 40, 50, 60, 70, 80, 90]

      const currentLevel = selected.level
      const currentAscension = selected.ascension

      selectItem({
        ...selectedItems,
        [slot]: {
          ...selected,
          level: level ? level : currentLevel,
          ascension: ascension ? ascension : currentAscension,
          maxLevel: ascensionTable[ascension ? ascension : currentAscension]
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
        handleSelectItem,
        clearItems,
        handleItemDisplay,
        setStats
      }}>
      {children}
    </ItemsContext.Provider>
  )
}
