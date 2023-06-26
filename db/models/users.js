// grab our db client connection to use with our adapters
const client = require('../client');

const createUser = async ({username, password, email, address}) => {
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users (username, password, email, address)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [username, password, email, address]);
    delete user.password;
    return user;
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = {
  // add your database adapter fns here
  createUser,
};