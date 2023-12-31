// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt')
const { getUsersItemsByUserId, deleteUserItem } = require('./users_items')

const createUser = async ({username, password, email, address, isAdmin}) => {
      const SALT_COUNT = 5;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users (username, password, email, address, "isAdmin")
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT DO NOTHING
      RETURNING *;
    `, [username, hashedPassword, email, address, isAdmin]);
    user && delete user.password;
    return user;
  }
  catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows: users } = await client.query(`
    SELECT *
    FROM users
    `);
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=${id}
    `);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [username]);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsernameAndPassword = async ({ username, password }) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw {
      error: 'UnknownUserError',
      message: 'User not found'
    }
  }
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    delete user.password;
    return user;
  } else {
    throw {
      error: 'IncorrectPasswordError',
      message: 'Incorrect Password'
    };
  }
};

const updateUser = async ({ id, ...fields }) => {
  const password = fields.password
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `, Object.values(fields)
    );

    if (password) {
      const SALT_COUNT = 5;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
      const { rows: [user] } = await client.query(`
        UPDATE users
        SET password=$1
        WHERE id=$2
        RETURNING *;
        `, [hashedPassword, id]
      );
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const usersItemsArr = await getUsersItemsByUserId(id)
    usersItemsArr.forEach(async (userItem) => {
      await deleteUserItem(userItem.id)
    })
    const { rows: [user] } = await client.query(`
      DELETE FROM users
      WHERE id=${id}
      RETURNING *;
  `);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByUsernameAndPassword,
  deleteUser,
  updateUser
};