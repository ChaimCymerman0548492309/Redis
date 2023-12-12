import { client } from "./server";

const connectToRedis = {

 
  async getPassword(username: string): Promise<string | null> {
    return await client.get(`username:${username}`);
  },

  async savePassword(username: string, password: string): Promise<void> {
    await client.set(`username:${username}`, password);
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

export default connectToRedis;
