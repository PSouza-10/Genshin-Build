import React, { useContext, useState } from 'react'
import {
  Container,
  Items,
  NavContainer,
  NavItem,
  CharacterIcon,
  WeaponsIcon,
  ArtifactsIcon,
  SearchContainer,
  SearchBar
} from './styles'
import Filter from './Filter'
import Item from '../Item'
import items from './placeholder'
import { FilterContext } from './FilterContext'

export function ItemPicker() {
  const [selectedTab, setTab] = useState('characters')
  const { selected } = useContext(FilterContext)

  return (
    <Container>
      <Nav {...{ selectedTab, setTab }} />
      <Items>
        <Search />
        <div className='itemTable'>
          {items.map(item =>
            item.set === selected || !selected ? (
              <Item key={item.id} {...item} />
            ) : null
          )}
        </div>
      </Items>
    </Container>
  )
}

const Nav = ({ selectedTab, setTab }) => {
  const handleSelect = event => {
    setTab(event.target.id)
  }

  const navItems = [
    {
      name: 'characters',
      icon: <CharacterIcon id='characters' />
    },
    {
      name: 'weapons',
      icon: <WeaponsIcon id='weapons' />
    },
    {
      name: 'artifacts',
      icon: <ArtifactsIcon id='artifacts' />
    }
  ]
  return (
    <NavContainer selected>
      {navItems.map(({ name, icon }, index) => (
        <NavItem
          key={index}
          selected={selectedTab === name}
          id={name}
          onClick={e => handleSelect(e)}>
          {icon}
        </NavItem>
      ))}
    </NavContainer>
  )
}

const Search = () => {
  return (
    <SearchContainer>
      <SearchBar placeholder='Search for an item...' />

      <Filter />
    </SearchContainer>
  )
}
