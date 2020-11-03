import React, { useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import { ItemsContext } from '../../ItemsContext'
import { FilterContext } from './FilterContext'
import { FilterIcon } from './styles'
export default function Filter({ tab }) {
  const { selectedFilter, handleFilterSelect } = useContext(FilterContext)
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  const { artifactSets, characterSets, weaponSets } = useContext(
    ItemsContext
  ).data

  const sets = {
    characters: characterSets,
    weapons: weaponSets,
    artifacts: artifactSets
  }
  const handleSelect = value => {
    handleFilterSelect(value, tab)
    toggle()
  }

  return (
    <>
      <FilterIcon onClick={toggle} />
      <FilterWrapper>
        <FilterBar onClick={toggle} open={open}>
          {selectedFilter[tab]}{' '}
          <span className='close' onClick={toggle}>
            &times;
          </span>
        </FilterBar>
        <FilterItems open={open}>
          <span className='close' onClick={toggle}>
            &times;
          </span>
          <FilterItem onClick={() => handleSelect('All')}>All</FilterItem>
          {Object.keys(sets[tab]).map((item, index) => (
            <FilterItem
              key={index}
              selected={selectedFilter === item}
              onClick={() => handleSelect(item)}>
              {item}
            </FilterItem>
          ))}
        </FilterItems>
      </FilterWrapper>
    </>
  )
}

const FilterWrapper = styled.div`
  position: relative;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 10;
  @media (max-width: 576px) {
    position: static;
    flex-basis: 70%;
  }
`

const FilterBar = styled.span`
  border-radius: 1em;
  padding: 2.5px 15px;
  position: relative;
  background-color: transparent;
  border: 1px solid var(--outline);
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  .close {
    display: none;
    font-size: 19px;
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      color: white;
    }
  }

  &:hover {
    border-color: var(--primary);
  }
  ${({ open }) =>
    open &&
    css`
      border: none;
      background-color: transparent;
      .close {
        display: initial;
      }
    `}
  z-index: 10;
  @media (max-width: 576px) {
    position: static;
    z-index: 0;
    padding-right: 0;
    .close {
      display: none;
    }
  }
`

const FilterItems = styled.ul`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  height: ${({ open }) => (open ? '200px' : '0')};
  overflow: hidden;
  color: ${({ open }) => (open ? 'var(--primary)' : 'rgba(0,0,0,0)')};
  transition: all 0.3s ease;
  background-color: var(--bgSecondary);

  &::-webkit-scrollbar {
    display: none;
  }
  position: absolute;
  width: 100%;
  border-radius: 1em;
  overflow-y: scroll;
  border: 1px solid var(--primary);
  padding-top: 28px;
  .close {
    display: none;
  }
  @media (max-width: 576px) {
    width: ${({ open }) => (open ? `100%` : '0')};
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    height: 100%;

    z-index: 15;
    border: none;
    border-radius: initial;
    padding-top: 6px;
    font-size: 14pt;
    .close {
      display: flex;
      justify-content: flex-end;
      font-size: 30pt;
      padding: 0 17px;
    }
  }
`
const FilterItem = styled.li`
  cursor: pointer;
  &:hover {
    color: white;
    background-color: var(--bgPrimary);
  }
  padding: 2px 17px;
  ${({ selected }) =>
    selected &&
    css`
      font-weight: 560;
      background-color: var(--primary);
      color: var(--bgSecondary);
      &:hover {
        font-weight: 560;
        background-color: var(--primary);
        color: var(--bgSecondary);
      }
    `}
`
