import express, { Request, Response } from "express";
import { createClient } from "redis";
import connectToRedis from "./connectToRedis";



const app = express();


import { config } from "dotenv";
config();


const { EXPRESS_BASE_URL, EXPRESS_PORT } = process.env;
export const client = createClient({
    password: '8114',
    socket: {
        host: '127.0.0.1',
        port: 6379
    }
    
});




const port = Number(EXPRESS_PORT);

app.listen(port, () => {
    console.log((`listening on: ${EXPRESS_BASE_URL}' '${port}`));
    client.connect()
    client.set('password_count',0)

        .then(() => console.log(("connected successfully to Redis client!!!")))
        .catch((error) => {
            if (error instanceof Error) {
                console.log((error.message));
            }
        });

       
        
        

    app.use(express.json());

    app.post("/getOnePassword", async (req: Request, res: Response) => {
        try {
            const { username } = req.body
            const data = await connectToRedis.getPassword(username)
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
            const { username, password } = req.body
            const data = await connectToRedis.savePassword(username, password)
            res.send(data);
            if (res.statusCode === 200) {}

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.send(error.message);
            }
        }
    })


    app.post('/saveUsernamesAndPasswords', async (req: Request, res: Response) => { 
        try {
            const { data } = req.body;
            if (!data || !Array.isArray(data)) {
                return res.status(400).send("נתונים לא תקינים");
            }            
            const sendDate = await connectToRedis.saveUsernamesAndPasswords(data);
            res.status(200).json({ message: "Usernames and passwords saved successfully" });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    });
    
    app.post('/getUsernamesAndPasswords', async (req: Request, res: Response) => {
        try {
            const { body } = req;
            // data.map((dataItem:any) => {console.log(dataItem);
            // })
            if (!body || !Array.isArray(body)) {
                return res.status(400).send("Invalid data");
            }
            const sendDate = await connectToRedis.getUsernamesAndPasswords(body);
            res.status(200).json(sendDate);
        } catch (error) {
            console.error('Error retrieving usernames and passwords from Redis');
        }
    });
    

});




