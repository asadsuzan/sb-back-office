import Project from './project.model';
import { IProject } from './project.types';

export const createProject = async (data: Partial<IProject>) => {
  const project = new Project(data);
  return await project.save();
};

export const getAllProjects = async () => {
  return await Project.find()
    .sort({ createdAt: -1 });
};

export const getProjectBySlug = async (slug: string) => {
  return await Project.findOne({ "basicInfo.slug":slug });
};


export const updateProjectBySlug = async (
  slug: string,
  data: Partial<IProject>,
) => {
  // Use $set to ensure only provided fields are updated, and not overwrite entire sub-objects
  // For nested objects, if you send { "basicInfo.title": "New Title" }, Mongoose will update correctly.
  // If you send { basicInfo: { title: "New Title" } }, it will replace the entire basicInfo object.
  // The current approach in the controller sends a flat updateData object with nested keys like 'screenshots',
  // which works with Mongoose's findOneAndUpdate.
  return await Project.findOneAndUpdate({ "basicInfo.slug": slug }, { $set: data }, { new: true });
};

export const deleteProjectBySlug = async (slug: string) => {
  return await Project.findOneAndDelete({ "basicInfo.slug":slug });
};
