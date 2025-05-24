import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.types";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    client: { type: String, required: true },
    timeframe: { type: String, required: true },

    githubUrl: { type: String },
    liveDemoUrl: { type: String },

    overview: {
      context: { type: String, required: true },
      targetAudience: { type: String, required: true },
      objectives: [{ type: String, required: true }],
    },

    screenshotUrl: { type: String },

    features: [{ type: String, required: true }],

    techStack: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    lessons: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", projectSchema);