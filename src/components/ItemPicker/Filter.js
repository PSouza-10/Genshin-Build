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
    if (value !== 'All') {
      if (!selectedFilter[tab].includes(value)) {
        handleFilterSelect(
          [...selectedFilter[tab].filter(val => val !== 'All'), value],
          tab
        )
      } else {
        const newFilter = selectedFilter[tab].filter(item => item !== value)

        handleFilterSelect(newFilter, tab)
      }
    } else {
      handleFilterSelect(['All'], tab)
    }
  }
  const filterString = selectedFilter[tab]
    .join(', ')
    .slice(0, window.innerWidth > 576 ? 42 : 14)

  return (
    <>
      <FilterIcon onClick={toggle} />
      <FilterWrapper>
        <FilterBar onClick={toggle} open={open}>
          {filterString}
          {filterString.length > (window.innerWidth > 576 ? 41 : 13) && '...'}
          <span className='close' onClick={toggle}>
            &times;
          </span>
        </FilterBar>
        <FilterItems open={open}>
          <span className='close' onClick={toggle}>
            &times;
          </span>
          <FilterItem
            onClick={() => handleSelect('All')}
            selected={selectedFilter[tab].includes('All')}>
            All
          </FilterItem>
          {Object.keys(sets[tab]).map((item, index) => (
            <FilterItem
              key={index}
              selected={selectedFilter[tab].includes(item)}
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

  @media (max-width: 576px) {
    position: static;
    flex-basis: 70%;
  }
`

const FilterBar = styled.span`
  border-radius: 1em;
  padding: 2.5px 15px;
  position: relative;

  z-index: 11;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
      border-radius: 1em 1em 0 0;
      border-color: var(--primary);
      border-bottom: none;
      background-color: var(--bgSecondary);
      .close {
        display: initial;
      }
    `}

  @media (max-width: 576px) {
    position: static;
    top: 0;
    z-index: 0;
    padding-right: 0;

    max-height: 30px;
    .close {
      display: none;
    }
  }
`

const FilterItems = styled.ul`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  height: ${({ open }) => (open ? '200px' : '0')};
  overflow: ${({ open }) => (open ? 'scroll' : 'hidden')};
  color: ${({ open }) => (open ? 'var(--primary)' : 'rgba(0,0,0,0)')};
  border-radius: 0 0 1em 1em;

  transition: height 0.3s ease, visibility 0.3s ease, opacity 0.3s ease;
  background-color: ${({ open }) =>
    open ? 'var(--bgSecondary)' : 'transparent'};
  opacity: ${({ open }) => (open ? '1' : '0')};

  &::-webkit-scrollbar {
    display: none;
  }
  position: absolute;
  z-index: 10;
  left: 0;
  bottom: 0;
  top: 22px;
  right: 0;

  border: 1px solid var(--primary);
  border-top: none;
  padding-top: 6px;

  .close {
    display: none;
  }
  @media (max-width: 576px) {
    width: ${({ open }) => (open ? `100%` : '0')};
    position: fixed;

    height: 100%;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
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
  padding-left: 20px;
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
