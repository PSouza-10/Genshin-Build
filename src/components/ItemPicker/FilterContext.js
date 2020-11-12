import React, { createContext, useState, useContext } from 'react'
import { ItemsContext } from '../../ItemsContext'

export const FilterContext = createContext({})

export default function FilterProvider({ children }) {
  const [selectedFilter, setFilter] = useState({
    characters: ['All'],
    weapons: ['All'],
    artifacts: ['All']
  })
  const { data } = useContext(ItemsContext)
  const { artifactSets, characterSets, weaponSets } = data

  const initialListState = {
    characters: data.characters,
    weapons: data.weapons,
    artifacts: data.artifacts
  }

  const [list, setList] = useState(initialListState)

  const changeDisplayedItems = (filter = [], category) => {
    let set = {}

    switch (category) {
      case 'characters':
        set = characterSets
        break
      case 'weapons':
        set = weaponSets
        break
      case 'artifacts':
        set = artifactSets
        break
      default:
        set = {}
    }

    let arrayOfSetItems = []
    Object.keys(set).forEach(key => {
      if (filter.includes(key)) {
        const ids = Object.keys(set[key].items).map(
          itemKey => set[key].items[itemKey]
        )
        const items = data[category].filter(({ id }) => ids.includes(id))
        arrayOfSetItems = [...arrayOfSetItems, ...items]
      }
    })
    return arrayOfSetItems
  }

  const handleFilterSelect = (newFilter = [], tab) => {
    if (newFilter !== []) {
      if (newFilter[0] === 'All') {
        setList({
          ...list,
          [tab]: initialListState[tab]
        })
        setFilter({
          ...selectedFilter,
          [tab]: ['All']
        })
      } else {
        const newList = changeDisplayedItems(newFilter, tab)

        setList({
          ...list,
          [tab]: newList
        })
        setFilter({
          ...selectedFilter,
          [tab]: newFilter.filter(filter => filter !== 'All')
        })
      }
    } else {
      setList({
        ...list,
        [tab]: initialListState[tab]
      })
      setFilter({
        ...selectedFilter,
        [tab]: ['All']
      })
    }
  }

  return (
    <FilterContext.Provider
      value={{ selectedFilter, handleFilterSelect, list }}>
      {children}
    </FilterContext.Provider>
  )
}
