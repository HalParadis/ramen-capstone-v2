const client = require('../client')

const createUserItem = async ({ userId, ramenId, count }) => {
  try {
    const { rows: [userItem] } = await client.query(`
      INSERT INTO users_items ("userId" , "ramenId", count)
      VALUES($1, $2, $3)
      ON CONFLICT ("userId", "ramenId") DO NOTHING
      RETURNING *;
    `, [userId, ramenId, count]);
    return userItem;

  } catch (error) {
    console.error(error);
  }
}

const getUsersItemsByUserId = async (id) => {
  try {
    const { rows: usersItems } = await client.query(`
      SELECT * 
      FROM users_items
      WHERE "userId"=$1
    `, [id]);
    return usersItems;

  } catch (error) {
    console.error(error);
  }
}

//userId, ramenId, count
const updateUserItemCount = async ({ id, count }) => {
  try {
    const { rows: [userItem] } = await client.query(`
      UPDATE users_items
      SET count=$2
      WHERE id=$1
      RETURNING *;
    `, [id, count]);
    return userItem;

  } catch (error) {
    console.error(error);
  }
}

const deleteUserItem = async (id) => {
  try {
    const { rows: [userItem]} = await client.query(`
      DELETE FROM
        users_items
      WHERE
        id=$1
      RETURNING *;
    `, [id]);
    return userItem;

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUserItem,
  getUsersItemsByUserId,
  updateUserItemCount,
  deleteUserItem
}