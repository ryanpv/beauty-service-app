import { body } from 'express-validator';
export const validateLogin = [
    body('email').isEmail().notEmpty().trim().escape(),
    body('password').isLength({ min: 8 }).notEmpty().escape()
];
//# sourceMappingURL=validate-login.js.map