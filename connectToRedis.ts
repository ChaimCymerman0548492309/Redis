import { client } from "./server";

const connectToRedis = {


  async getPassword(username: string): Promise<string | null> {
    return await client.get(`username:${username}`);
  },

  async savePassword(username: string, password: string): Promise<void> {
    await client.set(`username:${username}`, password);
  },

  async saveUsernamesAndPasswords(usersAndPasswords: [string, string][]): Promise<void> {
    for (const user of usersAndPasswords) {
        const username = user[0];
        const password = user[1];
        await client.set(`username:${username}`, password);
    }
},

  async getUsernamesAndPasswords(usernames: string[]): Promise<{ [username: string]: string | null }> {
    const result: { [username: string]: string | null } = {};
    for (const username of usernames){
      const password = await client.get(`username:${username}`);
      console.log(password);
    }
    
    for (let i = 0; i < usernames.length; i++) {
      console.log(i);
  
      const password = await client.get(`username:${usernames[i]}`);
      console.log(password);
  
      result[usernames[i]] = password;
  }
  
  

    return result;
  }
}


export default connectToRedis;
