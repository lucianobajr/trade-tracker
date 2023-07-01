import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Middleware de tratamento de erros do Zod
export function zodErrorHandler(
    err: z.ZodError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof z.ZodError) {
        // Erro de validação do Zod

        // Extrair os detalhes do erro do Zod
        const errorDetails = err.errors.map((error) => {
            return {
                path: error.path.join('.'),
                message: error.message,
            };
        });

        return res.status(400).json({ errors: errorDetails });
    }

    // Se não for um erro de validação do Zod, encaminha para o próximo middleware de erro
    return next(err);
}
