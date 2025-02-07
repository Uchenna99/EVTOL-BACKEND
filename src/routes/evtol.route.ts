import express from "express"
import { EvtolController } from "../controllers/evtol.controller";


const evtolController = new EvtolController();
const evtolRouter = express.Router();


evtolRouter.post('/create-evtol', evtolController.createEvtol);

evtolRouter.post('/create-load/', evtolController.loadEvtol);

evtolRouter.get('/fetch-evtol/:id', evtolController.getEvtol);

evtolRouter.get('/evtol-load', evtolController.getLoad);

evtolRouter.get('/fetch-all-evtols', evtolController.getAllEvtols);



export default evtolRouter;