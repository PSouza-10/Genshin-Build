import React, { useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import { FilterContext } from './FilterContext'
import { FilterIcon } from './styles'
export default function Filter() {
  const { selected, setSelected } = useContext(FilterContext)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const handleSelect = name => setSelected(name)
  const items = [
    {
      name: 'Resolution of Sojourner'
    },
    {
      name: "Gladiator's Finale"
    },
    {
      name: 'Thundering Fury'
    }
  ]

  return (
    <>
      <FilterIcon onClick={toggle} />
      <FilterWrapper>
        <FilterBar onClick={toggle} open={open}>
          {selected ? selected : 'Select a set...'}{' '}
          <span className='close' onClick={toggle}>
            &times;
          </span>
        </FilterBar>
        <FilterItems open={open}>
          <FilterItem onClick={() => setSelected('')}>Clear</FilterItem>
          {items.map((item, index) => (
            <FilterItem
              key={index}
              selected={selected === item.name}
              onClick={() => handleSelect(item.name)}>
              {item.name}
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
  z-index: 2;
  position: absolute;
  width: 100%;
  border-radius: 1em;
  /* margin-top: -25px; */
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
