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
  return await Project.findOne({ slug });
};

export const updateProjectBySlug = async (
  slug: string,
  data: Partial<IProject>,
) => {
  return await Project.findOneAndUpdate({ slug }, data, { new: true });
};

export const deleteProjectBySlug = async (slug: string) => {
  return await Project.findOneAndDelete({ slug });
};
