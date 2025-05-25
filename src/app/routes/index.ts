import express from 'express';
import ProjectRoute from '../modules/project/project.route';
import BlogRoute from '../modules/blog/blog.route';


const router = express.Router();

const routes = [
  {
    path: '/projects',
    route: ProjectRoute
  },
  {
    path: '/blogs',
    route: BlogRoute
  },

];

routes.forEach((route) => {
  router.use(route.path, route.route);
});





const AppRoutes = router;

export default AppRoutes;
