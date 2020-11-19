import styled from 'styled-components'

const HelpContent = styled.div`
  padding: 20px 25px;
  overflow-y: scroll;
  background-color: var(--bgSecondary);
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 0.4em;
  }
  .title {
    font-size: 1.4rem;
    padding: 6px 0;
  }
  .table {
  }
  .text {
    font-size: 1.2rem;
    color: white;
    text-align: justify;
    .bold {
      font-weight: 520;
      color: var(--primary);
    }
  }
  a {
    color: var(--hover);
  }
`
export default HelpContent
