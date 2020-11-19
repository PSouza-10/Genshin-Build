import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './GlobalStyle'
import ItemsProvider from './ItemsContext/index'
import App from './App'
import MessageProvider from './MessageContext'
import StatProvider from './StatContext'
ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <ItemsProvider>
        <StatProvider>
          <GlobalStyle />
          <App />
        </StatProvider>
      </ItemsProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
