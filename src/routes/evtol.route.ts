import express from "express"
import { EvtolController } from "../controllers/evtol.controller";


const evtolController = new EvtolController();
const evtolRouter = express.Router();


evtolRouter.post('/create-evtol', evtolController.createEvtol);

evtolRouter.post('/create-load/:id', evtolController.loadEvtol);



export default evtolRouter;