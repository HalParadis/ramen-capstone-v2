const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log('Starting to drop tables...');

    await client.query(`
      DROP TABLE IF EXISTS users_items;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS ramen;
    `);

    console.log('Finished dropping tables!');

    // build tables in correct order
    console.log('Starting to construct tables...');

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE ramen(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        description TEXT,
        brand VARCHAR(255) NOT NULL,
        UNIQUE (name, brand)
      );
      CREATE TABLE users_items(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "ramenId" INTEGER REFERENCES ramen(id),
        count INTEGER
      );
    `);

    console.log('Finished constructing tables!');
  } catch (error) {
    console.error(error);
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
