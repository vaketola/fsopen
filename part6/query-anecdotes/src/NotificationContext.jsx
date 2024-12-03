import { useReducer, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "OFF":
      return ''
    case "ON":
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
