import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { z } from "zod";
import { HTTPSTATUS } from "../config/http.config";
import { joinWorkspaceByInviteService } from "../services/member.service";
import { getWorkspaceMembersService } from "../services/member.service";


export const joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
  const inviteCode = String(
  req.params.inviteCode
);

const userId = String(
  req.user?._id
);

    const { workspaceId, role } =
      await joinWorkspaceByInviteService(
        userId,
        inviteCode
      );

    return res.status(
      HTTPSTATUS.OK
    ).json({
      message:
        "Successfully joined the workspace",
      workspaceId,
      role,
    });
  }
);

export const getWorkspaceMembersController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId;
    const currentUserId = req.user?._id;

    const members = await getWorkspaceMembersService(
      workspaceId,
      currentUserId
    );

    return res.status(200).json({
      message: "Miembros obtenidos correctamente",
      data: members,
    });
  }
);
