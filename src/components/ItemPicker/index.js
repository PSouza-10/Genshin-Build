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
import { FilterContext } from './FilterContext'

export function ItemPicker() {
  const [selectedTab, setTab] = useState('characters')
  const { list } = useContext(FilterContext)
  const [query, setQuery] = useState('')

  return (
    <Container>
      <Nav {...{ selectedTab, setTab }} />
      <Items>
        <Search tab={selectedTab} query={query} setQuery={setQuery} />
        <div className='itemTable'>
          {list[selectedTab].map(
            item =>
              (item.name.toLowerCase().includes(query) || query === '') && (
                <Item key={item.id} item={item} />
              )
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

const Search = ({ tab, query, setQuery }) => {
  const searchItem = (query = '') => {
    setQuery(query.toLowerCase())
  }

  return (
    <SearchContainer>
      <SearchBar
        placeholder='Search for an item...'
        onChange={e => searchItem(e.target.value)}
        value={query}
        type='search'
      />

      <Filter tab={tab} />
    </SearchContainer>
  )
}
