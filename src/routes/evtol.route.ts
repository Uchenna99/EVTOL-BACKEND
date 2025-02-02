import express from "express"
import { EvtolController } from "../controllers/evtol.controller";


const evtolController = new EvtolController();
const evtolRouter = express.Router();


evtolRouter.post('/create-evtol', evtolController.createEvtol);

evtolRouter.post('/create-load/:id', evtolController.loadEvtol);

evtolRouter.get('/fetch-evtol/:id', evtolController.getEvtol);

evtolRouter.get('/evtol-load/:id', evtolController.getLoad);



export default evtolRouter;