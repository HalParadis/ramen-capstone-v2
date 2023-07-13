const {
  client,
  createUser,
  createRamen,
  createUserItem,
  getUsersItemsByUserId,
  updateUserItemCount,
  deleteUserItem,
  getAllRamen,
  getRamenById,
  deleteRamen,
  updateRamen,
  getAllUsers,
  deleteUser
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS users_items;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS ramen;
    `);

    console.log("Finished dropping tables!");

    // build tables in correct order
    console.log("Starting to construct tables...");

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
        "imgURL" TEXT,
        brand VARCHAR(255) NOT NULL,
        UNIQUE (name, brand)
      );
      CREATE TABLE users_items(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "ramenId" INTEGER REFERENCES ramen(id),
        UNIQUE ("userId", "ramenId"),
        count INTEGER
      );
    `);

    console.log("Finished constructing tables!");
  } catch (error) {
    console.error(error);
  }
}

async function populateInitialData() {
  try {
    console.log("Trying to seed tables...");

    await createUser({
      username: "Bob",
      password: "BobsPassword",
      email: "bob@email.com",
    });

    await createUser({
      username: "Smith",
      password: "SmithsPassword",
      email: "smith@email.com",
    });

    await createUser({
      username: "John",
      password: "JohnsPassword",
      email: "john@email.com",
    });

    await createUser({
      username:"Admin",
      password:"Admin",
      email:"adminsemail@email.com",
      isAdmin: "true"
    })

    console.log("Success creating users!");

    // const { rows: users } = await client.query(`
    //   SELECT * FROM users;
    // `);

    const users = await getAllUsers()
    console.log("All users: ", users);

    // await createRamen({
    //   name: "Shrimp Flavored Cup Noodles",
    //   price: "$1.00",
    //   description: "Amazing noodles",
    //   brand: "Nissan",
    // });

    await createRamen({
      name: "Samyang Ramen Soup",
      price: "$9.99",
      imgURL: "https://justasianfood.com/cdn/shop/files/SamyangRamenSoup-ExtraSpicy4Packs16.92oz_480g__front_360x.jpg?v=1684522683",
      description: "Extra Spicy 4 Packs 16.92oz (480g)",
      brand: "Samyang",
    });

    // await createRamen({
    //   name: "Tonkotsu Ramen",
    //   price: "$2.00",
    //   description: "Extra Amazing Ramen",
    //   brand: "Sapporo Ichiban",
    // });

    // await createRamen({
    //   name: "Ramen",
    //   price: "$2.50",
    //   description: "Korean Beef Flavored Noodle Soup",
    //   brand: "Gomtang",
    // });


    console.log("Finished Seeding Ramen");

    const { rows: ramen } = await client.query(`
      SELECT * FROM ramen
    `);
    console.log("All Ramen", ramen);
   

    await createUserItem({
      userId: "2",
      ramenId: "1",
      count: "1",
    });

    // await createUserItem({
    //   userId: "1",
    //   ramenId: "3",
    //   count: "2",
    // });

    await createUserItem({
      userId: "3",
      ramenId: "1",
      count: "1",
    });

    await createUserItem({
      userId: "1",
      ramenId: "1",
      count: "1",
    });
    console.log("Finished seeding users_items");

    const { rows: users_items } = await client.query(`
      SELECT * FROM users_items
    `);
    console.log("All users_items", users_items);

  } catch (error) {
    console.error(error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
