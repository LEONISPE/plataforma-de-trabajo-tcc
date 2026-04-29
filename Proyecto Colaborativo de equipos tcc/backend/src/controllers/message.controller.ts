import { Request, Response } from "express";
import { sendMessageService } from "../services/message.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getIO } from "../socket";
import { getMessagesService } from "../services/message.service";

export const sendMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const senderId = req.user?._id;
    const { receiverId, content } = req.body;
    const { workspaceId } = req.params;

    const message = await sendMessageService(
      workspaceId,
      senderId,
      receiverId,
      content
    );

    const io = getIO();

    io.to(receiverId).emit("new-message", {
      message: "Nuevo mensaje recibido",
      data: message,
    });

    return res.status(200).json({
      message: "Mensaje enviado",
      data: message,
    });
  }
);

export const getMessagesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { workspaceId } = req.params;
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