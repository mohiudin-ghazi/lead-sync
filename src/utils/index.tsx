import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { message } from "antd";

// Infer the correct type of messageApi using ReturnType
type MessageApiType = ReturnType<typeof message.useMessage>[0];

interface MessageContextType {
  messageApi: MessageApiType;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageApi = (): MessageApiType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageApi must be used within MessageProvider");
  }
  return context.messageApi;
};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ messageApi }), [messageApi]);

  return (
    <MessageContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
