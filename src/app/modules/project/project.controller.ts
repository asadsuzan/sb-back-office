/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import * as projectService from './project.service';
import asyncHandler from '../../utils/asyncHandler';
import sendSuccessResponse from '../../utils/successResponse';
import { deleteImageFromCloudinary, deleteImagesFromCloudinary, uploadImageToCloudinary } from '../../utils/imageUploadService';
import { IProject } from './project.types';

// @desc    Create a new project
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    // Ensure req.body.data exists and is a string before parsing
    if (!req.body.data || typeof req.body.data !== 'string') {
      sendSuccessResponse(res, 400, 'Project data is required in req.body.data');
      return;
    }

    let data: Partial<IProject>;
    try {
      data = JSON.parse(req.body.data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      sendSuccessResponse(res, 400, 'Invalid JSON data in req.body.data');
      return;
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      sendSuccessResponse(res, 400, 'At least one screenshot is required for new projects');
      return;
    }

    const screenshots: string[] = [];
    for (const file of files) {
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

// @desc    Update a project by slug
export const updateProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
      sendSuccessResponse(res, 400, 'Slug is required');
      return;
    }

    let updateData: Partial<IProject> = {};
    const newScreenshots: string[] = [];

    // Parse data from req.body.data
    if (req.body.data) {
      try {
        updateData = JSON.parse(req.body.data);
      } catch (error) {
        sendSuccessResponse(res, 400, 'Invalid JSON data in request body');
        return;
      }
    } else if (req.body) {
      updateData = req.body;
    }

    // Handle file uploads
    const files = req.files as Express.Multer.File[];
    if (files?.length > 0) {
      for (const file of files) {
        const imgUrl = await uploadImageToCloudinary(file.buffer);
        newScreenshots.push(imgUrl);
      }
    }

    // Get the current project to access existing screenshots
    const currentProject = await projectService.getProjectBySlug(slug);
    if (!currentProject) {
      sendSuccessResponse(res, 404, 'Project not found');
      return;
    }

    // Determine which screenshots to keep and which to delete
    const { existingScreenshotUrls = [], ...restUpdateData } = updateData as any as { existingScreenshotUrls?: string[] };
    const existingScreenshotsToKeep = existingScreenshotUrls;
    const screenshotsToDelete = currentProject.screenshots?.filter(
      url => !existingScreenshotsToKeep.includes(url)
    ) || [];

    // Delete removed screenshots from Cloudinary
    if (screenshotsToDelete.length > 0) {
      try {
        await deleteImagesFromCloudinary(screenshotsToDelete);
      } catch (error) {
        console.error('Error deleting old screenshots:', error);
        // Continue with update even if deletion fails (you might want to handle this differently)
      }
    }

    // Merge screenshots
    const finalScreenshots = [
      ...existingScreenshotsToKeep,
      ...newScreenshots
    ];

    // Update the screenshots in updateData
    updateData.screenshots = finalScreenshots;

    // Ensure slug remains unchanged
    if (updateData.basicInfo) {
      updateData.basicInfo.slug = currentProject.basicInfo?.slug || slug;
    } else {
      updateData.basicInfo = {
        title: currentProject.basicInfo?.title || '',
        slug: currentProject.basicInfo?.slug || slug,
        description: currentProject.basicInfo?.description || ''
      };
    }

    const updatedProject = await projectService.updateProjectBySlug(
      slug,
      updateData
    );

    if (!updatedProject) {
      sendSuccessResponse(res, 404, 'Project not found');
      return;
    }

    sendSuccessResponse(
      res,
      200,
      'Project updated successfully',
      updatedProject
    );
  }
);
// @desc    Get all projects
export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await projectService.getAllProjects();
    sendSuccessResponse(res, 200, 'Projects fetched successfully', projects);
  },
);

// @desc    Get project summaries
export const getProjectSummaries = asyncHandler(
  async (req: Request, res: Response) => {
    const summaries = await projectService.getProjectSummaries();
    sendSuccessResponse(res, 200, 'Project summaries fetched successfully', summaries);
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
