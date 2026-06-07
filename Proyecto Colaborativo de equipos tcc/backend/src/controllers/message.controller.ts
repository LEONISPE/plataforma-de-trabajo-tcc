import { Request, Response } from "express";
import { sendMessageService } from "../services/message.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getIO, getReceiverSocketId } from "../socket";
import { getMessagesService } from "../services/message.service";
import UserModel from "../models/user.model";


export const sendMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const senderId = req.user?._id;
    const workspaceId = req.params.workspaceId as string;

    const { receiverId, content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({
        message: "El mensaje no puede estar vacío",
      });
    }

console.log("senderId:", senderId);
console.log("receiverId:", receiverId);

    if (senderId?.toString() === receiverId) {
      return res.status(400).json({
        message: "No puedes enviarte mensajes a ti mismo",
      });
    }

    const receiverExists = await UserModel.exists({
      _id: receiverId,
    });

    if (!receiverExists) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const message = await sendMessageService(
      workspaceId,
      senderId,
      receiverId,
      content
    );

    const io = getIO();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", message);
    }

    return res.status(201).json({
      message: "Mensaje enviado",
      data: message,
    });
  }
);


export const getMessagesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const workspaceId = req.params.workspaceId as string;

    const { otherUserId } = req.query;

    const messages = await getMessagesService(
      workspaceId,
      userId,
      otherUserId as string
    );

    return res.status(200).json({
      message: "Mensajes obtenidos",
      data: messages,
    });
  }
);