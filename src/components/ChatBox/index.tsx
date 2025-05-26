import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, Empty } from "antd";
import { getMessages, sendUserMessage } from "api/conversation";
import { useAppState } from "hooks";
import { getTimePassed } from "helpers";
import { useMessageApi } from "utils";

function ChatBox({ chat, setSendMessage, receiveMessage }: any) {
  const {
    auth: { user },
  } = useAppState();
  const [messages, setMessages] = useState<any>([]);
  const [currMessage, setCurMessage] = useState("");
  const scroll = useRef<HTMLDivElement>(null);
const messageApi = useMessageApi();

  const handleSend = async () => {
    try {
      const { data } = await sendUserMessage(chat.conversation._id, {
        senderId: user._id,
        text: currMessage,
      });
      setMessages([...messages, data]);
      setCurMessage("");
    } catch (err: any) {
      messageApi.error(err?.request?.data?.msg || "Error Sending Message!");
    }
    // send message to socket server
    const receiverId = chat.conversation?.members.find(
      (member: any) => member._id !== user._id
    );
    // @ts-ignore
    setSendMessage({ senderId: user._id, text: currMessage, receiverId });
  };
  
  //   fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat.conversation._id);
        setMessages(data);
      } catch (error) {
        console.log("Error | Chat | ChatBox | getMessages", error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  
  //
  useEffect(() => {
    // also added && receiveMessage.chatId === chat._id
    if (receiveMessage !== null) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  
  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
      {chat ? (
        <>
          <div className="flex items-center justify-between p-2.5 border-b border-[#afb8cf]">
            <div className="flex items-center gap-[13px]">
              <Avatar
                className="!w-[50px] !h-[50px]"
                src={user?.about?.profilePic}
                alt={user?.username}
                onError={() => {
                  // If image fails to load, show first letter of username
                  return true;
                }}
              >
                {chat?.receiver?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              <h3 className="text-h3 m-0">{`${chat.receiver?.username}`}</h3>
            </div>

            <Button className="border-none shadow-[1px_0px_5px_rgba(169,169,169,0.5),-2px_0px_5px_rgba(169,169,169,0.5),0px_2px_5px_rgba(169,169,169,0.5)] flex items-center">
              <i className="icon-favorite"></i>
            </Button>
          </div>
          <div
            className="scroll-hide flex-grow overflow-y-scroll"
            style={{ height: "calc(100vh - 240px)" }}
          >
            <p className="text-[#AFB8CF] text-center">Today | 06:32 PM</p>

            {messages.map((message: any) => (
              <div
                ref={scroll}
                className={`px-[15px] ${
                  message.senderId !== user._id ? "message-in" : "message-out"
                }`}
              >
                <p className="message">{message.text}</p>
                <p className="text-[#AFB8CF] !m-0">
                  {getTimePassed(message.createdAt)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex pt-[15px] pb-[15px] border-t border-[#afb8cf]">
            <Button className="border-none">
              <i className="icon-emoji"></i>
            </Button>
            <Input
              placeholder="Type your message here ..."
              value={currMessage}
              onChange={(e) => setCurMessage(e.target.value)}
            />
            <Button onClick={handleSend} className="border-none">
              <i className="icon-send"></i>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full justify-center items-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Chat Selected"
          />
        </div>
      )}
    </>
  );
}

export default ChatBox;
