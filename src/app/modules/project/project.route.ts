import { Router } from 'express';
import * as projectController from './project.controller';
import { upload } from '../../middlewares/multer';

const router = Router();

router.post(
  '/',
  upload.array('screenshots', 5),
  projectController.createProject,
);
router.get('/', projectController.getAllProjects);
router.get('/summaries', projectController.getProjectSummaries);
router.get('/:slug', projectController.getProjectBySlug);
router.put(
  '/:slug',
  upload.array('screenshots', 5), 
  projectController.updateProjectBySlug,
);;
router.delete('/:slug', projectController.deleteProjectBySlug);

export default router;
