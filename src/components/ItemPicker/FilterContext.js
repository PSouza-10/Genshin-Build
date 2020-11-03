import React, { createContext, useState, useContext } from 'react'
import { ItemsContext } from '../../ItemsContext'

export const FilterContext = createContext({})

export default function FilterProvider({ children }) {
  const [selectedFilter, setFilter] = useState({
    characters: 'All',
    weapons: 'All',
    artifacts: 'All'
  })
  const { data } = useContext(ItemsContext)
  const { artifactSets, characterSets, weaponSets } = data

  const initialListState = {
    characters: data.characters,
    weapons: data.weapons,
    artifacts: data.artifacts
  }

  const [list, setList] = useState(initialListState)

  const changeDisplayedItems = (set, category) => {
    const arrayOfSetItems = Object.keys(set).map(key => {
      const item = data[category].find(({ id }) => set[key] === id)
      return item
    })

    setList({
      ...list,
      [category]: arrayOfSetItems
    })
  }

  const handleFilterSelect = (newFilter, tab) => {
    if (newFilter !== 'All') {
      let setCategory = {}

      switch (tab) {
        case 'characters':
          setCategory = characterSets
          break
        case 'weapons':
          setCategory = weaponSets
          break
        case 'artifacts':
          setCategory = artifactSets
          break
        default:
          setCategory = {}
      }

      changeDisplayedItems(setCategory[newFilter].items, tab)
    } else {
      setList(initialListState)
    }
    setFilter({
      ...selectedFilter,
      [tab]: newFilter
    })
  }

  return (
    <FilterContext.Provider
      value={{ selectedFilter, handleFilterSelect, list }}>
      {children}
    </FilterContext.Provider>
  )
}
