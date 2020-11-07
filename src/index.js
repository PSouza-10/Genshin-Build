import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './GlobalStyle'
import ItemsProvider from './ItemsContext/index'
import App from './App'
import MessageProvider from './MessageContext'
ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <ItemsProvider>
        <GlobalStyle />
        <App />
      </ItemsProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
