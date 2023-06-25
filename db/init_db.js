const {
  client,
  createUser
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
    console.log('Trying to seed tables...');

    await createUser({
      username: 'Bob',
      password: 'BobsPassword',
      email: 'bob@email.com'
    });

    await createUser({
      username: 'Smith',
      password: 'SmithsPassword',
      email: 'smith@email.com'
    });

    await createUser({
      username: 'John',
      password: 'JohnsPassword',
      email: 'john@email.com'
    });

    console.log('Success creating users!');
  } catch (error) {
    console.error(error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());