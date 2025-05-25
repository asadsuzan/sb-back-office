import { Request, Response } from "express";
import * as projectService from "./project.service";
import asyncHandler from "../../utils/asyncHandler";
import sendSuccessResponse from "../../utils/successResponse";



// @desc    Create a new project
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);

  sendSuccessResponse(res, 201, "Project created successfully", project);
});


// @desc    Get all projects
export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();
  sendSuccessResponse(res,200,"Projects fetched successfully", projects)

}
);