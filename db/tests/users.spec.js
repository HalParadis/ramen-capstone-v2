// require('dotenv').config();
// const { 
//   createUser,
// } = require('../index')
// const { buildTables } = require('../init_db');
// const client = require('../client');

// let usersFromDatabase;
// const getUsersFromDB = async () => { 
//   const {rows} = await client.query(`
//       SELECT * FROM users;
//     `);
//   usersFromDatabase = rows;
// }

// describe('Users Table', () => {
//   beforeAll(async () => {
//     client.connect();

//     // console.log('Starting to drop tables...');

//     // await client.query(`
//     //   DROP TABLE IF EXISTS users_items;
//     //   DROP TABLE IF EXISTS users;
//     //   DROP TABLE IF EXISTS ramen;
//     // `);

//     // console.log('Finished dropping tables!');

//     await getUsersFromDB();
//   });
//   afterAll(async () => {
//     client.end();
//   });

//   describe('createUser', () => {
//     it('adds a user object to the users table', async () => {
//       const numUsers = usersFromDatabase.length;
//       await createUser({
//         username: 'Bob',
//         password: 'BobsPassword',
//         email: 'bob@email.com'
//       });
//       await getUsersFromDB();
//       expect(numUsers + 1).toEqual(usersFromDatabase.length);
//     });
//   });
// })