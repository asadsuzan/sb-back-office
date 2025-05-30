import { Request, Response } from 'express';
import * as projectService from './project.service';
import asyncHandler from '../../utils/asyncHandler';
import sendSuccessResponse from '../../utils/successResponse';
import { uploadImageToCloudinary } from '../../utils/imageUploadService';

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data);
    // Upload screenshots
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      sendSuccessResponse(res, 400, 'At least one screenshot is required');
      return;
    }
    const screenshots: string[] = [];
    for (const file of files || []) {
      const imgUrl = await uploadImageToCloudinary(file.buffer);
      screenshots.push(imgUrl);
    }

    // Save to DB
    const newProject = await projectService.createProject({
      ...data,
      screenshots,
    });

    res.status(201).json({ success: true, data: newProject });
  },
);

// @desc    Get all projects
export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await projectService.getAllProjects();
    sendSuccessResponse(res, 200, 'Projects fetched successfully', projects);
  },
);

// @desc    Get a project by slug
export const getProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
      sendSuccessResponse(res, 400, 'Slug is required');
      return;
    }
    const project = await projectService.getProjectBySlug(slug);

    if (!project) {
      sendSuccessResponse(res, 404, 'Project not found');
      return;
    }

    sendSuccessResponse(res, 200, 'Project fetched successfully', project);
  },
);

// @desc    Update a project by slug
export const updateProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
      sendSuccessResponse(res, 400, 'Slug is required');

      return;
    }
    console.log('Request body:', req.body.data);
    const updatedProject = await projectService.updateProjectBySlug(
      slug,
      req.body,
    );

    if (!updatedProject) {
      sendSuccessResponse(res, 404, 'Project not found');
      return;
    }

    sendSuccessResponse(
      res,
      200,
      'Project updated successfully',
      updatedProject,
    );
  },
);

// @desc    Delete a project by slug
export const deleteProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
      sendSuccessResponse(res, 400, 'Slug is required');
      return;
    }
    const deletedProject = await projectService.deleteProjectBySlug(slug);

    if (!deletedProject) {
      sendSuccessResponse(res, 404, 'Project not found');
      return;
    }

    sendSuccessResponse(
      res,
      200,
      'Project deleted successfully',
      deletedProject,
    );
  },
);
