import express from "express"
import cors from "cors"
import dotenv from "dotenv"


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

app.use('evtol/api/v1/users', )



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

export default app;