"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userServices_impl_1 = require("../services/implementation/userServices.impl");
class UserController {
    constructor() {
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield this.userServices.createUser(data);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const user = yield this.userServices.getUserById(id);
                res.status(200).json(user);
            }
            catch (error) {
            }
        });
        this.getMeds = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allMeds = yield this.userServices.getAllMeds();
                res.status(200).json(allMeds);
            }
            catch (error) {
                next(error);
            }
        });
        this.userServices = new userServices_impl_1.UserServicesImpl();
    }
}
exports.UserController = UserController;
