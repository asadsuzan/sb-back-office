
import { Router } from "express";
import * as projectController from "./project.controller";

const router = Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/:slug", projectController.getProjectBySlug);
router.put("/:slug", projectController.updateProjectBySlug);
router.delete("/:slug", projectController.deleteProjectBySlug);


export default router;