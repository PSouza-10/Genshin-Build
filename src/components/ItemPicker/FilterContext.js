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

  const changeDisplayedItems = (set, filter = [], category) => {
    let arrayOfSetItems = []
    Object.keys(set).forEach(key => {
      if (filter.includes(key)) {
        console.log(set[key].items)
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
      if (!newFilter.includes('All')) {
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

        const newList = changeDisplayedItems(setCategory, newFilter, tab)

        setList({
          ...list,
          [tab]: newList
        })
      } else {
        setList({ ...list, [tab]: initialListState[tab] })
      }
      setFilter({
        ...selectedFilter,
        [tab]: newFilter
      })
    } else {
      setList({
        ...list,
        [tab]: []
      })

      console.log(list)
    }
  }

  return (
    <FilterContext.Provider
      value={{ selectedFilter, handleFilterSelect, list }}>
      {children}
    </FilterContext.Provider>
  )
}
