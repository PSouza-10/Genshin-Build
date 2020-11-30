import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { CloseIcon, HelpIcon } from './styles'
import content from './helpContent'
import { MdKeyboardArrowRight } from 'react-icons/md'
export default function Help({ toggle, state }) {
  const tabs = [
    {
      displayName: 'Introduction',
      name: 'introduction'
    },
    {
      displayName: 'User Guide',
      name: 'userGuide'
    },
    {
      displayName: 'How it Works',
      name: 'howItWorks'
    },
    {
      displayName: 'Updates',
      name: 'updates'
    },
    {
      displayName: 'Contribute',
      name: 'contribute'
    }
  ]
  const [selected, setTab] = useState(tabs[0])
  return (
    <>
      <span
        className='iconWrapper'
        title='Help'
        style={{ marginLeft: 'auto' }}
        onClick={() => toggle()}>
        <HelpIcon className='icon' />
      </span>
      <Container open={state}>
        <Tabs
          selected={selected}
          setTab={setTab}
          toggle={() => toggle()}
          tabs={tabs}
        />
        {content[selected.name]}
      </Container>
    </>
  )
}

function Tabs({ selected, setTab, toggle, tabs }) {
  const [collapseOpen, setCollapse] = useState(false)
  const handleCollapse = () => {
    setCollapse(!collapseOpen)
  }
  return (
    <div className='header'>
      {window.innerWidth < 577 && (
        <span className='collapseControl' onClick={handleCollapse}>
          <h1>{selected.displayName}</h1>
          <MdKeyboardArrowRight />
        </span>
      )}
      <TabsContainer open={collapseOpen}>
        {tabs.map((tab, index) => (
          <TabItem
            onClick={() => {
              setTab(tab)
              if (window.innerWidth < 577) {
                handleCollapse()
              }
            }}
            selected={selected.name === tab.name}
            key={index}>
            {tab.displayName}
          </TabItem>
        ))}
      </TabsContainer>
      <CloseIcon onClick={toggle} style={{ marginLeft: 'auto' }} />
    </div>
  )
}
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 60;
  transition: all 0.3s ease;
  background-color: var(--bgPrimary);
  ${({ open }) =>
    open
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `};

  display: flex;
  flex-direction: column;
  .collapseControl {
    display: flex;
    align-items: center;
    padding: 10px 0;
    padding-left: 20px;
    height: 50px;
    h1 {
      font-size: 1.4rem;
    }
    svg {
      height: 30px;
      width: 30px;
    }
  }
  .header {
    display: flex;
  }
`
const TabsContainer = styled.ul`
  list-style: none;
  display: flex;
  height: 50px;
  align-self: flex-start;
  background-color: var(--bgPrimary);

  @media (max-width: 576px) {
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    transition: all 0.2s ease;
    overflow: hidden;
    height: auto;
    width: ${({ open }) => (open ? '100%' : '0')};
  }
`
const TabItem = styled.li`
  font-size: 1.3rem;
  text-align: center;
  padding: 12px 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    color: white;
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: var(--primary);
      color: var(--bgPrimary);
      font-weight: 500;
      &:hover {
        color: var(--bgPrimary);
      }
    `}
`
