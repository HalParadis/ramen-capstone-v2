
require('dotenv').config();

const { 
  createUser,
} = require('../index')
const { handle } = require('../../index');
const client = require('../client');

let usersFromDatabase;
const getUsersFromDB = async () => { 
  const {rows} = await client.query(`
      SELECT * FROM users;
  `);
  usersFromDatabase = rows;
}

describe('Users Table', () => {
  beforeAll(async () => {
    await getUsersFromDB();
  });
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  describe('createUser', () => {
    it('adds a user object to the users table', async () => {
      await createUser({
        username: 'FakeBob',
        password: 'FakeBobsPassword',
        email: 'fake-bob@email.com'
      });
      await getUsersFromDB();
      const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username = ($1);
      `, ['FakeBob'])
      expect(user.username).toEqual('FakeBob');
    });
  });
})