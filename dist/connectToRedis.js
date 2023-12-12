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
};
// Example usage
const username = 'john_doe';
const password = 'super_secure_password';
// Save password
// connectToRedis.savePassword(username, password)
//   .then(() => console.log(`Password for ${username} saved successfully`))
//   .catch((error) => console.error(`Error saving password: ${error.message}`));
// // Get password
// connectToRedis.getPassword(username)
//   .then((retrievedPassword) => {
//     if (retrievedPassword !== null) {
//       console.log(`Password for ${username}: ${retrievedPassword}`);
//     } else {
//       console.log(`Password for ${username} not found`);
//     }
//   })
//   .catch((error) => console.error(`Error retrieving password: ${error.message}`));
exports.default = connectToRedis;
