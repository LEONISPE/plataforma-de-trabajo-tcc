import MessageModel from "../models/message.model";


export const sendMessageService = async (
  workspaceId: string,
  senderId: string,
  receiverId: string,
  content: string
) => {
  const message = new MessageModel({
    workspaceId,
    senderId,
    receiverId,
    content,
  });

  await message.save();

  return message;
};

export const getMessagesService = async (
  workspaceId: string,
  userId: string,
  otherUserId: string
) => {
  const messages = await MessageModel.find({
    workspaceId,
    $or: [
      { senderId: userId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: userId },
    ],
  })
    .sort({ createdAt: 1 });

  return messages;
};