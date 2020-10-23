import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './GlobalStyle'
import ItemsProvider from './ItemsContext/index'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ItemsProvider>
      <GlobalStyle />
      <App />
    </ItemsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
