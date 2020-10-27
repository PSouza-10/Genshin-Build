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
    console.log(id, slot)
    if (
      slot &&
      selectedItems[slot].id === id &&
      slot === selectedItems[slot].type.toLowerCase().split(' ')[0]
    ) {
      selectItem({
        ...selectedItems,
        [slot]: {}
      })
    } else {
      const { characters, artifacts, weapons } = initialState.data
      const allItems = [...characters, ...artifacts, ...weapons]
      const newItem = allItems.find(
        item => id === item.id && slot === item.type.toLowerCase().split(' ')[0]
      )

      selectItem({
        ...selectedItems,
        [slot]: newItem
      })
    }
  }

  function clearItems() {
    selectItem(initialState.selectedItems)
  }
  return (
    <ItemsContext.Provider
      value={{ ...initialState, selectedItems, handleSelectItem, clearItems }}>
      {children}
    </ItemsContext.Provider>
  )
}
