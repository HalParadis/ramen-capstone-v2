const client = require('../client')
const {getUsersItemsByRamenId, deleteUserItem}= require('./users_items')

const createRamen = async ({ name, price, description, brand, imgURL }) => {
  try {
    const { rows: [ramen] } = await client.query(`
      INSERT INTO ramen(name, price, description, brand, "imgURL")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [name, price, description, brand, imgURL]);
    return ramen;
  } catch (error) {
    throw error;
  }
}

const getAllRamen = async () => {
  try {
    const { rows: ramen } = await client.query(`
      SELECT *
      FROM ramen;
    `);
    return ramen;
  } catch (error) {
    throw error;
  }
}

const getRamenById = async (id) => {
  try {
    const { rows: [ramen] } = await client.query(`
      SELECT *
      FROM ramen
      WHERE id=$1;
    `, [id]);
    return ramen;
  } catch (error) {
    throw error;
  }
}

const deleteRamen = async (id) => {
    try{
        const usersItemsArr = await getUsersItemsByRamenId(id)
        usersItemsArr.forEach(async (userItem) => {
         await deleteUserItem(userItem.id);
     })
        const {rows: [ramen]} = await client.query(`
        DELETE FROM ramen
        WHERE id=${id}
        RETURNING *;
        `)
        return ramen;
    } catch(error){
      throw error;
    }
}

const updateRamen = async ({id, ...fields}) =>{
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ')
    try{
        const {rows: [ramen]} = await client.query(`
        UPDATE ramen
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,Object.values(fields))
        return ramen;
    } catch(error){
      throw error;
    }
}

module.exports = {
  createRamen,
  getAllRamen,
  getRamenById,
  deleteRamen, 
  updateRamen
}
