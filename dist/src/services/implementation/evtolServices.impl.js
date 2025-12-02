"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvtolServicesImpl = void 0;
const db_1 = require("../../config/db");
class EvtolServicesImpl {
    async createEvtol(data) {
        const findEvtol = await db_1.db.evtol.findUnique({
            where: { serialNumber: data.serialNumber }
        });
        if (findEvtol) {
            throw new Error(`Evtol with serial number ${data.serialNumber} already exists`);
        }
        else {
            const newEvtol = await db_1.db.evtol.create({
                data: {
                    serialNumber: data.serialNumber,
                    maxWeight: data.maxWeight,
                    model: data.model,
                    image: data.image
                }
            });
            return newEvtol;
        }
    }
    async createLoad(data) {
        await db_1.db.load.createMany({
            data
        });
    }
    async getEvtolById(id) {
        const findEvtol = await db_1.db.evtol.findUnique({
            where: { id }
        });
        if (!findEvtol) {
            throw new Error(`Evtol with id: ${id} not found`);
        }
        return findEvtol;
    }
    async getEvtolLoad(orderId) {
        const findOrder = await db_1.db.load.findMany({
            where: { orderId }
        });
        return findOrder;
    }
    async getAllEvtols() {
        const allEvtols = await db_1.db.evtol.findMany({});
        return allEvtols;
    }
    async getAvailableEvtols(data) {
        return await db_1.db.evtol.findMany({
            where: {
                batteryCapacity: { gt: 25 },
                maxWeight: { gte: data.weight }
            }
        });
    }
}
exports.EvtolServicesImpl = EvtolServicesImpl;
