"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const evtol_controller_1 = require("../controllers/evtol.controller");
const evtolController = new evtol_controller_1.EvtolController();
const evtolRouter = express_1.default.Router();
evtolRouter.post('/create-evtol', evtolController.createEvtol);
evtolRouter.get('/fetch-evtol/:id', evtolController.getEvtol);
evtolRouter.get('/fetch-all-evtols', evtolController.getAllEvtols);
exports.default = evtolRouter;
