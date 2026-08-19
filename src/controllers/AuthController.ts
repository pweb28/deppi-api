import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { prisma } from "../lib/prisma";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";
import { RegisterCivilServantDto } from "@/model/RegisterCivilServantDto";
import { string } from "zod";

export class AuthController {

  async registerStudent(request: Request, response: Response) {

    const student: RegisterStudentDto = request.body;

    const authService = new AuthService();

    const user = await authService.registerStudent(student);

    return response.status(201).json(user);
  }

  async registerCivilServant(request: Request, response: Response, role: string) {
    try {
      const civilServant: RegisterCivilServantDto = request.body;

      if (!role || typeof role !== 'string') {
        return response.status(400).json({ message: "Role inválida ou ausente" });
      }

      const authService = new AuthService();

      const user = await authService.registerCivilServant(civilServant, role);

      response.status(201).json(user);
      return;
    } catch (error: any) {
      return response.status(400).json({ message: error.message || "Erro interno do servidor." });
    }

  }

  async login(request: Request, response: Response) {

    const { email, password } = request.body;

    const authService = new AuthService();

    const result = await authService.login(
      email,
      password
    );

    return response.json(result);
  }

  async me(request: Request, response: Response) {

    const users = await prisma.user.findMany();

    console.log(users);

    return response.json(users);
  }
}