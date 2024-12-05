import { useReducer, createContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return null;
    case "LOGIN":
      return action.payload;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
