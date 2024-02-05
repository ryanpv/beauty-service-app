import { body } from "express-validator";
export const validateContactForm = [
    body("name").trim().isLength({ min: 0 }).escape(),
    body("email").trim().isEmail().escape(),
    body("subject").trim().notEmpty().escape(),
    body("phone_number").trim().isLength({ min: 0 }).escape(),
    body("message").trim().notEmpty().escape()
];
//# sourceMappingURL=validate-contact-form.js.map