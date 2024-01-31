import { param } from 'express-validator';
export const validatePasswordResetToken = [
    param('token').notEmpty().escape()
];
//# sourceMappingURL=validate-reset-token.js.map