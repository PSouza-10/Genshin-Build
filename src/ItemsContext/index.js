import React, { createContext, useState } from 'react'
import JSONDATA from './data.json'
const data = JSONDATA
const initialState = {
  data: {
    ...data
  },

  selectedItems: {
    flower: {},
    plume: {},
    sands: {},
    goblet: {},
    circlet: {},
    character: {},
    weapon: {}
  }
}
export const ItemsContext = createContext(initialState)

export default function ItemsProvider({ children }) {
  const [selectedItems, selectItem] = useState(initialState.selectedItems)
  const handleSelectItem = (id, slot) => {
    if (slot && selectedItems[slot].id === id) {
      selectItem({
        ...selectedItems,
        [slot]: {}
      })
    } else {
      const { characters, artifacts, weapons } = initialState.data
      const allItems = [...characters, ...artifacts, ...weapons]
      const newItem = allItems.find(item => id === item.id)

      selectItem({
        ...selectedItems,
        [slot]: newItem
      })
    }
  }
  return (
    <ItemsContext.Provider
      value={{ ...initialState, selectedItems, handleSelectItem }}>
      {children}
    </ItemsContext.Provider>
  )
}
