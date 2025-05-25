

import  {  Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  client: string;
  timeframe: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  overview: {
    context: string;
    targetAudience: string;
    objectives: string[];
  };
  screenshotUrl: string[];
  features: string[];
  techStack: {
    title: string;
    description: string;
  }[];
  lessons: string[];
  createdAt: Date;
  updatedAt: Date;
}


