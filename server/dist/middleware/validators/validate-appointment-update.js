import { param, body } from 'express-validator';
export const validateAppointmentUpdate = [
    param('appointmentId').exists().isString().escape(),
    body('id').exists().isNumeric(),
    body('date').notEmpty().isString().escape().trim(),
    body('time').notEmpty().isString().escape().trim(),
    body('service_name').notEmpty().isString().escape().trim(),
    body('price_paid').escape().trim(),
    body('status').isNumeric(),
    body('status_name').isString().escape().trim(),
    body('name').isString().escape().trim(),
    body('email').isEmail().escape().trim(),
];
//# sourceMappingURL=validate-appointment-update.js.map