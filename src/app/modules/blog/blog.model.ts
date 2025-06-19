import mongoose from 'mongoose';

// Define a sub-schema for content blocks
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['heading', 'paragraph', 'image', 'list', 'code'], // Allowed block types
  },
  // Common fields for all blocks
  text: { type: String }, // For heading, paragraph
  level: { type: String }, // For heading (h1, h2, etc.)
  url: { type: String }, // For image
  alt: { type: String }, // For image
  items: { type: [String] }, // For list
  language: { type: String }, // For code
  snippet: { type: String }, // For code
}, { _id: false }); // Do not create an _id for sub-documents if not needed

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Remove whitespace from both ends of a string
  },
  thumbnailUrl: {
    type: String,
    default: '', // Default to empty string if no thumbnail
  },
  contentBlocks: {
    type: [contentBlockSchema], // Array of content blocks
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` field on every save
blogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});


export default mongoose.model('BlogPost', blogPostSchema);