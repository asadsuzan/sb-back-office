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

// @desc    Get a project by slug
export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
   sendSuccessResponse(res, 400, "Slug is required");
    return;
  }
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
  
    sendSuccessResponse(res, 404, "Project not found");
    return;
  }

  sendSuccessResponse(res, 200, "Project fetched successfully", project);
});

// @desc    Update a project by slug
export const updateProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
   sendSuccessResponse(res, 400, "Slug is required");

    return;
  }
  const updatedProject = await projectService.updateProjectBySlug(slug, req.body);

  if (!updatedProject) {
  
    sendSuccessResponse(res, 404, "Project not found");
    return;
  }

  sendSuccessResponse(res, 200, "Project updated successfully", updatedProject);
});

// @desc    Delete a project by slug
export const deleteProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
    
    sendSuccessResponse(res, 400, "Slug is required");
    return;
  }
  const deletedProject = await projectService.deleteProjectBySlug(slug);

  if (!deletedProject) {
   
    sendSuccessResponse(res, 404, "Project not found");
    return;
  }

  sendSuccessResponse(res, 200, "Project deleted successfully", deletedProject);
});