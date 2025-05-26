import API from "api";

export const createConversation = (formData: any) =>
  API.post("/conversation", formData);

export const getUserConversations = (userId: any) =>
  API.get(`/conversation/user/${userId}`);

export const sendUserMessage = (chatId: any, formData: any) =>
  API.post(`/conversation/${chatId}/message`, formData);

export const getMessages = async (id: string) =>
  API.get(`/conversation/${id}/messages`);
