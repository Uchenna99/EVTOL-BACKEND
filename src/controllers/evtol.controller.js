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
exports.EvtolController = void 0;
const evtolServices_impl_1 = require("../services/implementation/evtolServices.impl");
class EvtolController {
    constructor() {
        this.createEvtol = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const evtol = yield this.evtolServices.createEvtol(data);
                res.status(201).json(evtol);
            }
            catch (error) {
                next(error);
            }
        });
        this.loadEvtol = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = parseInt(req.params.id);
                const data = req.body;
                yield this.evtolServices.createLoad(data);
                res.status(201).json({ message: 'Evtol loaded successfully' });
            }
            catch (error) {
                next(error);
            }
        });
        this.getEvtol = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const evtol = yield this.evtolServices.getEvtolById(id);
                res.status(200).json(evtol);
            }
            catch (error) {
                next(error);
            }
        });
        this.getLoad = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const load = yield this.evtolServices.getEvtolLoad(id);
                res.status(200).json(load);
            }
            catch (error) {
                next(error);
            }
        });
        this.evtolServices = new evtolServices_impl_1.EvtolServicesImpl();
    }
}
exports.EvtolController = EvtolController;
