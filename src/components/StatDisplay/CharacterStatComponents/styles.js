import styled, { css } from 'styled-components'

export const TalentContainer = styled.div`
  display: flex;
  flex-direction: column;

  .talentName {
    font-size: 1.5rem;
    background-color: var(--bgPrimary);
    text-align: center;
    padding: 10px 0;
  }

  .talentData {
    background-color: var(--bgSecondary);
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    .talentLvl {
      flex-basis: 40%;
      display: flex;

      justify-content: space-between;
      padding: 15px 20px;
      input {
        font-size: 1.3rem;
        background-color: transparent;
        border: none;
        width: 25px;
        text-align: center;
      }
    }
    .talentDMG {
      text-align: center;
      padding: 15px 0;
      flex: 1;
    }
  }
`
export const IconButton = styled.button`
  border-radius: 50%;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  svg {
    fill: var(--outline);
    height: 12px;
    width: 12px;
  }
  padding: 3px;

  &:active {
    background-color: white;
  }

  &:hover {
    background-color: ${({ negative }) =>
      negative ? 'var(--negative)' : 'var(--positive)'};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      filter: brightness(50%);
      &:active {
        background-color: var(--primary);
      }

      &:hover {
        background-color: var(--primary);
      }
    `}
`
