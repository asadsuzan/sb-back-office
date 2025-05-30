import mongoose, { Schema } from 'mongoose';
import { IProject } from './project.types';

const projectSchema = new Schema<IProject>(
  {
    basicInfo: {
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      description: { type: String, required: true },
    },
    meta: {
      status: {
        type: String,
        enum: ['planned', 'in-progress', 'completed'],
        default: 'completed',
      },
      category: {
        type: String,
        enum: [
          'web-development',
          'mobile-app',
          'data-science',
          'machine-learning',
          'game-development',
          'devops',
          'ui-ux-design',
          'other',
          'full-stack-development',
          'cloud-computing',
          'cybersecurity',
          'blockchain',
          'internet-of-things',
          'artificial-intelligence',
          'augmented-reality',
          'virtual-reality',
          'natural-language-processing',
          'big-data',
          'edge-computing',
          'quantum-computing',
          'robotics',
          'automation',
          'e-commerce',
          'social-media',
          'content-management',
          'enterprise-software',
          'healthcare-technology',
          'fintech',
          'education-technology',
          'travel-technology',
          'real-time-communication',
          'supply-chain-management',
          'digital-marketing',
          'search-engine-optimization',
          'mobile-game-development',
          'web-game-development',
          'desktop-application',
        ],
        required: true,
      },
      client: { type: String, required: true },
      timeframe: {
        type: String,
        required: true,
        match: /^[A-Za-z]{3} \d{4} – [A-Za-z]{3} \d{4}$/,
      },
    },
    links: {
      githubUrl: { type: String, required: true },
      liveDemoUrl: { type: String, required: false },
    },

    overview: {
      context: { type: String, required: true },
      targetAudience: { type: String, required: true },
      objectives: [{ type: String, required: true }],
    },

    screenshots: {
      type: [String],
      validate: {
        validator: function (arr: string[]) {
          return arr.length >= 1 && arr.length <= 3;
        },
        message: 'Screenshots must contain between 1 and 3 image URLs.',
      },
    },

    features: [{ type: String, required: true }],

    technologies: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    lessonsLearned: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export default mongoose.model<IProject>('Project', projectSchema);
