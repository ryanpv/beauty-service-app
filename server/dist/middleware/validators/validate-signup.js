import { body } from 'express-validator';
export const validateSignup = [
    body('name').isString().notEmpty().escape(),
    body('email').isEmail().notEmpty().escape().trim(),
    body('phone_number').isString().notEmpty().escape(),
    body('password').isLength({ min: 8 }).escape(),
];
//# sourceMappingURL=validate-signup.js.map