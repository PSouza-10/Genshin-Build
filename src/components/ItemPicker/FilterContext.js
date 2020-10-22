import React, { createContext, useState } from 'react'

export const FilterContext = createContext('')

export default function FilterProvider({ children }) {
  const [selected, setSelected] = useState('')

  return (
    <FilterContext.Provider value={{ selected, setSelected }}>
      {children}
    </FilterContext.Provider>
  )
}
