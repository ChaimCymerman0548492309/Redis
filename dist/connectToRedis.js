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
const server_1 = require("./server");
const connectToRedis = {
    getPassword(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield server_1.client.get(`username:${username}`);
        });
    },
    savePassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield server_1.client.set(`username:${username}`, password);
        });
    },
    saveUsernamesAndPasswords(usersAndPasswords) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const user of usersAndPasswords) {
                const username = user[0];
                const password = user[1];
                yield server_1.client.set(`username:${username}`, password);
            }
        });
    },
    getUsernamesAndPasswords(usernames) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            for (const username of usernames) {
                const password = yield server_1.client.get(`username:${username}`);
                console.log(password);
            }
            for (let i = 0; i < usernames.length; i++) {
                console.log(i);
                const password = yield server_1.client.get(`username:${usernames[i]}`);
                console.log(password);
                result[usernames[i]] = password;
            }
            return result;
        });
    }
};
exports.default = connectToRedis;
