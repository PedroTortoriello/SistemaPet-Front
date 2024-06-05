import { z } from 'zod';

// =-=-=-Schemas Users-=-=-= //

export const AuthUserFormSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.'),
    password: z
        .string()
        .nonempty('A senha é obrigatória.'),
    pet_id: z
        .string()  // ou outro tipo apropriado para o pet_id
        .optional(),  // tornar opcional se necessário
    nome: z
        .string()  // ou outro tipo apropriado
        .optional(),  // tornar opcional se necessário
});

export const UserFormSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.'),
    password: z
        .string()
        .nonempty('A senha é obrigatória.'),
    status: z
        .boolean().optional(),
    pet_id: z
        .string().optional(),
    confirmpassword: z
        .string()
        .nonempty('A confirmação de senha é obrigatória.')
}).refine((data) => data.password === data.confirmpassword, {
    message: 'As senhas não coincidem',
    path: ['confirmpassword']
})

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.')
});