import express from 'express';
import ProjectRoute from '../modules/project/project.route';


const router = express.Router();

const routes = [
  {
    path: '/projects',
    route: ProjectRoute
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});





const AppRoutes = router;

export default AppRoutes;
