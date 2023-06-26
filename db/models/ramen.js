const client = require('../client')

const createRamen = async ({name, price, description, brand}) =>{
    try{
        const {rows: [ramen]} = await client.query(`
        INSERT INTO ramen(name, price, description, brand)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ( name, brand ) DO NOTHING
        RETURNING *;
        `, [name, description, price, brand])
        return ramen;
    } catch(error){
        console.error(error)
    }
}

module.exports = {
    createRamen
}