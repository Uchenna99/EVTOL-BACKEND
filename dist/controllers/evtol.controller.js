"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvtolController = void 0;
const evtolServices_impl_1 = require("../services/implementation/evtolServices.impl");
class EvtolController {
    constructor() {
        this.createEvtol = async (req, res, next) => {
            try {
                const data = req.body;
                const evtol = await this.evtolServices.createEvtol(data);
                res.status(201).json(evtol);
            }
            catch (error) {
                next(error);
            }
        };
        this.getEvtol = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id);
                const evtol = await this.evtolServices.getEvtolById(id);
                res.status(200).json(evtol);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllEvtols = async (req, res, next) => {
            try {
                const allEvtols = await this.evtolServices.getAllEvtols();
                res.status(200).json(allEvtols);
            }
            catch (error) {
                next(error);
            }
        };
        this.evtolServices = new evtolServices_impl_1.EvtolServicesImpl();
    }
}
exports.EvtolController = EvtolController;
