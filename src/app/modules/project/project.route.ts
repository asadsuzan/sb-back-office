
import { Router } from "express";
import * as projectController from "./project.controller";

const router = Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);


export default router;