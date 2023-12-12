import express, { Request, Response } from "express";
import { createClient } from "redis";
import connectToRedis from "./connectToRedis";

const app = express();


import { config } from "dotenv";
config();


const { EXPRESS_BASE_URL, EXPRESS_PORT } = process.env;
export const client = createClient({
    password: 'psKJpf9FLikITRvONKm3ERhMOzx9XQat',
    socket: {
        host: 'redis-18891.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 18891
    }
});

const port = Number(EXPRESS_PORT);

app.listen(port, () => {
    console.log((`listening on: ${EXPRESS_BASE_URL}' '${port}`));
    client.connect()
        .then(() => console.log(("connected successfully to Redis client!!!")))
        .catch((error) => {
            if (error instanceof Error) {
                console.log((error.message));
            }
        });

    app.use(express.json())


    app.get("/getOnePassword", async (req: Request, res: Response) => {
        try {
            const { Password } = req.body
            const data = await connectToRedis.getPassword(Password)
            res.send(data);

        } catch (error) {
            if (error instanceof Error) {                
                console.log(error.message);
                res.send(error.message);
            }
        }
    });

    app.post("/saveOnePassword", async (req: Request, res: Response) => {
        try {
            const { username , password } = req.body
            const data = await connectToRedis.savePassword(username , password)
            res.send(data);

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.send(error.message);
            }
        }
    });


    
});


// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/ChaimCymerman0548492309/Redis.git
// git push -u origin main