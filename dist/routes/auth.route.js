"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authController = new auth_controller_1.AuthController();
const authRouter = express_1.default.Router();
authRouter.post('/login', authController.login);
authRouter.post('/verify-email', authController.verifyEmail);
exports.default = authRouter;
