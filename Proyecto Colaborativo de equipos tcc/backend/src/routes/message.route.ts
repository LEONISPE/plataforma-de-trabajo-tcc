import { Router } from "express";
import { sendMessageController } from "../controllers/message.controller"
import { getMessagesController } from "../controllers/message.controller";


const router = Router();


/**
 * @swagger
 * /api/message/:
 *   post:
 *     summary: mandar mensajes
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: hola bro
 *             
 *     responses:
 *       200:
 *         description: mensaje enviafo
 *         content:
 *           application/json:
 *             example:
 *               message: mensaje enviado
 *               user:
 *                 _id: "123"
 *                 name: "leo"
 *                 email: "leonispe@gmail.com"
 *       401:
 *         description: mensaje no enviado
 */
router.post(
  "/workspace/:workspaceId/send",
  sendMessageController
);

router.get(
  "/workspace/:workspaceId",
  getMessagesController
);

export default router;