const client = require('../client')

const createRamen = async ({ name, price, description, brand }) => {
  try {
    const { rows: [ramen] } = await client.query(`
      INSERT INTO ramen(name, price, description, brand)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ( name, brand ) DO NOTHING
      RETURNING *;
      `, [name, description, price, brand]);
    return ramen;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
}

const deleteRamen = async (id) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ')
    try{
        const {rows: [ramen]} = await client.query(`
        DELETE FROM ramen
        WHERE id=${id}
        RETURNING *
        `,)
        return ramen;
    } catch(error){
        console.error(error)
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
        RETURNING *
        `,Object.values(fields))
        return ramen;
    } catch(error){
        console.error(error)
    }
}

module.exports = {
  createRamen,
  getAllRamen,
  getRamenById,
  deleteRamen, 
  updateRamen
}