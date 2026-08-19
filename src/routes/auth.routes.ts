import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { registerStudentSchema } from "@/schemas/registerstudent.schema";
import { registerCivilServantSchema } from "@/schemas/registercivilservant";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  "/register",
  validate(registerStudentSchema),
  authController.registerStudent
);

authRoutes.post(
  "/admin/servidores",
  AuthMiddleware,
  permissionMiddleware("MANAGE_ROLES"),
  validate(registerCivilServantSchema),
  (request, response) => authController.registerCivilServant(request, response, "DEPPI")
);

authRoutes.post(
  "/deppi/servidores",
  AuthMiddleware,
  permissionMiddleware("DEPPI_ROLES"),
  validate(registerCivilServantSchema),
  (request, response) => authController.registerCivilServant(request, response, "PROFESSOR")
);

authRoutes.post("/login", authController.login);

authRoutes.get("/me", AuthMiddleware, authController.me);

export { authRoutes };