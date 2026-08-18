import { prisma } from "../lib/prisma";
import { randomBytes, createHash } from "crypto";
import { EmailService } from "./EmailService";

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; 

export class PasswordRecoveryService {

    constructor(private emailService: EmailService) {}

    async forgotPassword(email: string): Promise<void> {  
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return;
        }

        const token = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256")
        .update(token)
        .digest("hex");

        const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_TIME);

        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,

            }
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await this.emailService.sendEmail(
            user.email,
            "Recuperação de senha - DEPPI",
`Olá, ${user.name}.

Recebemos uma solicitação para redefinição da sua senha.

Acesse o link abaixo para continuar:

${resetLink}

Este link é válido por 1 hora.

Se você não solicitou a recuperação de senha, ignore este e-mail.

Atenciosamente,
Equipe DEPPI`
        );
    }
}