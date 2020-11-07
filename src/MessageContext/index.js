import React, { useState, createContext } from 'react'

export const MessageContext = createContext({})

export default function MessageProvider({ children }) {
  const [message, setMessage] = useState({
    message: '',
    title: '',
    type: ''
  })
  const [messageIsVisible, setIsVisible] = useState(false)
  function sendMessage(
    message,
    type = 'Warning',
    title = 'Warning',
    closeIn = 3000
  ) {
    setMessage({
      message: message,
      type,
      title
    })
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), closeIn)
  }
  return (
    <MessageContext.Provider
      value={{ ...message, messageIsVisible, sendMessage }}>
      {children}
    </MessageContext.Provider>
  )
}
