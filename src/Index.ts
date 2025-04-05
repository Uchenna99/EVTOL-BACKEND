import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/user.route";
import evtolRouter from "./routes/evtol.route";
import authRouter from "./routes/auth.route";
import { db } from "./config/db";
import { log } from "console";



dotenv.config();

const portEnv = process.env.PORT;
if (!portEnv) {
    console.error('Error: PORT is not defined in .env file')
    process.exit(1);
}

const PORT: number = parseInt(portEnv, 10);
if(isNaN(PORT)) {
    console.error('Error: PORT is not a number in .env file');
    process.exit(1);
}


const app = express();

const corsOptions = {
    origin: '*',
    credentilas: true,
    allowedHeaders: '*',
    methods: 'GET, POST, PUT, PATCH, DELETE, HEAD'
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('/api/v1/evtol', evtolRouter);

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/admin', authRouter);




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

export default app;