import React, { useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import { ItemsContext } from '../../ItemsContext'
import { FilterContext } from './FilterContext'
import { FilterIcon } from './styles'
export default function Filter({ tab }) {
  const { selectedFilter, handleFilterSelect } = useContext(FilterContext)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  const { artifactSets, characterSets, weaponSets } = useContext(
    ItemsContext
  ).data

  const sets = {
    characters: characterSets,
    weapons: weaponSets,
    artifacts: artifactSets
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
          <FilterItem onClick={() => handleFilterSelect('All', tab)}>
            All
          </FilterItem>
          {Object.keys(sets[tab]).map((item, index) => (
            <FilterItem
              key={index}
              selected={selectedFilter === item}
              onClick={() => handleFilterSelect(item, tab)}>
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
`

const FilterBar = styled.span`
  border-radius: 1em;
  padding: 2.5px 15px;
  position: relative;
  background-color: transparent;
  border: 1px solid var(--outline);
  display: flex;
  justify-content: space-between;
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
  z-index: 6;
`

const FilterItems = styled.ul`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  height: ${({ open }) => (open ? '200px' : '0')};
  overflow: hidden;
  color: ${({ open }) => (open ? 'var(--primary)' : 'rgba(0,0,0,0)')};
  transition: all 0.3s ease;
  background-color: var(--bgSecondary);

  position: absolute;
  width: 100%;
  border-radius: 1em;

  border: 1px solid var(--primary);
  padding-top: 28px;
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
