import { useContext, useReducer } from "react";
import { createContext } from "react";

import { useAuth } from "./authContext";

const ChatContext = createContext();

export const useChat = () => {
  const value = useContext(ChatContext);
  return value;
};
export const ChatContextProvider = ({ children }) => {
  const { user } = useAuth();

  const Initial_State = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          
          user: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };
      default:
        return { state };
    }
  };

  const [state, dispatch] = useReducer(chatReducer, Initial_State);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
