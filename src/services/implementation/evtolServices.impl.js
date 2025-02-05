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
exports.EvtolServicesImpl = void 0;
const db_1 = require("../../config/db");
class EvtolServicesImpl {
    createEvtol(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findEvtol = yield db_1.db.evtol.findUnique({
                where: { serialNumber: data.serialNumber }
            });
            if (findEvtol) {
                throw new Error(`Evtol with serial number ${data.serialNumber} already exists`);
            }
            else {
                const newEvtol = yield db_1.db.evtol.create({
                    data: {
                        serialNumber: data.serialNumber,
                        model: data.model,
                        image: data.image
                    }
                });
                return newEvtol;
            }
        });
    }
    createLoad(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.db.load.createMany({
                data
            });
        });
    }
    getEvtolById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findEvtol = yield db_1.db.evtol.findUnique({
                where: { id }
            });
            if (!findEvtol) {
                throw new Error(`Evtol with id: ${id} not found`);
            }
            return findEvtol;
        });
    }
    getEvtolLoad(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findLoad = yield db_1.db.load.findMany({
                where: { evtolId: id }
            });
            return findLoad;
        });
    }
}
exports.EvtolServicesImpl = EvtolServicesImpl;
