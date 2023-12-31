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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const connectToRedis_1 = __importDefault(require("./connectToRedis"));
const app = (0, express_1.default)();
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { EXPRESS_BASE_URL, EXPRESS_PORT } = process.env;
exports.client = (0, redis_1.createClient)({
    password: '8114',
    socket: {
        host: '127.0.0.1',
        port: 6379
    }
});
const port = Number(EXPRESS_PORT);
app.listen(port, () => {
    console.log((`listening on: ${EXPRESS_BASE_URL}' '${port}`));
    exports.client.connect();
    exports.client.set('password_count', 0)
        .then(() => console.log(("connected successfully to Redis client!!!")))
        .catch((error) => {
        if (error instanceof Error) {
            console.log((error.message));
        }
    });
    app.use(express_1.default.json());
    app.post("/getOnePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username } = req.body;
            const data = yield connectToRedis_1.default.getPassword(username);
            res.send(data);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.send(error.message);
            }
        }
    }));
    app.post("/saveOnePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const data = yield connectToRedis_1.default.savePassword(username, password);
            res.send(data);
            if (res.statusCode === 200) { }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.send(error.message);
            }
        }
    }));
    app.post('/saveUsernamesAndPasswords', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = req.body;
            if (!data || !Array.isArray(data)) {
                return res.status(400).send("נתונים לא תקינים");
            }
            const sendDate = yield connectToRedis_1.default.saveUsernamesAndPasswords(data);
            res.status(200).json({ message: "Usernames and passwords saved successfully" });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    }));
    app.post('/getUsernamesAndPasswords', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = req;
            // data.map((dataItem:any) => {console.log(dataItem);
            // })
            if (!body || !Array.isArray(body)) {
                return res.status(400).send("Invalid data");
            }
            const sendDate = yield connectToRedis_1.default.getUsernamesAndPasswords(body);
            res.status(200).json(sendDate);
        }
        catch (error) {
            console.error('Error retrieving usernames and passwords from Redis');
        }
    }));
});
