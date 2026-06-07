import { Router } from "express";
import { joinWorkspaceController } from "../controllers/member.controller";
import {
  getWorkspaceMembersController,
} from "../controllers/member.controller";

const memberRoutes = Router();

memberRoutes.post("/workspace/:inviteCode/join", joinWorkspaceController);

memberRoutes.get(
  "/workspace/:workspaceId/members",
  getWorkspaceMembersController
);

export default memberRoutes;
