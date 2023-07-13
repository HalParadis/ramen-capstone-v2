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
        brand VARCHAR(255) NOT NULL
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

    await createRamen({
      name: "Extra Spicy Ramen Soup",
      price: "$9.99",
      imgURL: "https://justasianfood.com/cdn/shop/files/SamyangRamenSoup-ExtraSpicy4Packs16.92oz_480g__front_360x.jpg?v=1684522683",
      description: "Extra Spicy 4 Packs 16.92oz (480g)",
      brand: "Samyang",
    });

    await createRamen({
      name: "Ramen Soup",
      price: "$9.99",
      imgURL: "https://justasianfood.com/cdn/shop/files/SamyangRamenSoup5Packs21.15oz_600g__front_300x300.jpg?v=1684522680",
      description: "5 Packs 21.15oz (600g)",
      brand: "Samyang",
    });

    await createRamen({
      name: "Gompaghetti",
      price: "$8.99",
      imgURL: "https://justasianfood.com/cdn/shop/files/PaldoGompaghettiKoreanBeefFlavoredNoodlesFamilyPack15.52oz_440g__front_300x300.jpg?v=1684521996",
      description: "Korean Beef Flavored Noodles Family Pack 15.52oz (440g)",
      brand: "Paldo",
    });

    await createRamen({
      name: "Premium Shin Ramyun Green",
      price: "$12.99",
      imgURL: "https://justasianfood.com/cdn/shop/files/NongshimPremiumShinRamyunGreenRamen4Packs17.6oz_500g__front_300x300.jpg?v=1684521992",
      description: "Ramen 4 Packs 17.6oz (500g)",
      brand: "Nongshim",
    });

    await createRamen({
      name: "Premium Shin Ramyun Gold",
      price: "$12.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/NongshimPremiumShinRamyunGoldRamen4Packs18.3oz_520g__front_300x300.jpg?v=1680202396",
      description: "Ramen 4 Packs 18.3oz (520g)",
      brand: "Nongshim",
    });

    await createRamen({
      name: "Chacharoni Jjajang",
      price: "$8.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/SamyangChacharoniJjajangRamen5Pack24.65oz_700g__front_300x300.jpg?v=1676035475",
      description: "Ramen 5 Pack 24.65oz (700g)",
      brand: "Samyang",
    });

    await createRamen({
      name: "K Army Stew Style Noodle Soup",
      price: "$4.59",
      imgURL: "https://justasianfood.com/cdn/shop/products/NongshimKArmyStewStyleNoodleSoup-BigBowl4.02oz_114g__front_300x300.jpg?v=1673382299",
      description: "Big Bowl 4.02oz (114g)",
      brand: "Nongshim",
    });

    await createRamen({
      name: "Stir-Fried Chicken Noodle With Spicy Soy Sauce",
      price: "$8.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/PaldoStir-FriedChickenNoodleWithSpicySoySauce18.32oz_520g__front_300x300.jpg?v=1672776343",
      description: "18.32oz (520g)",
      brand: "Paldo",
    });

    await createRamen({
      name: "Hot Chicken Ramen Cup",
      price: "$2.59",
      imgURL: "https://justasianfood.com/cdn/shop/products/SamyangHotChickenRamenCup-CarbonaraFlavor2.82oz_80g__front_300x300.jpg?v=1671826106",
      description: "Carbonara Flavor 2.82oz (80g)",
      brand: "Samyang",
    });

    await createRamen({
      name: "Hot Chicken Ramen Kimchi Flavor",
      price: "$3.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/SamyangHotChickenRamenKimchiFlavor-BigBowl3.7oz_105g__front_300x300.jpg?v=1671826099",
      description: "Big Bowl 3.7oz (105g)",
      brand: "Samyang",
    });

    await createRamen({
      name: "Shin Ramyun Cup Black",
      price: "$3.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/NongshimShinRamyunCupBlackRamen3.5oz_101g__front_300x300.jpg?v=1647979134",
      description: "Ramen 3.5 oz (101g)",
      brand: "Nongshim",
    });

    await createRamen({
      name: "Hot Chicken Ramen",
      price: "$9.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/SamyangHotChickenRamen-CheeseFlavor5Pack24.7oz_front_300x300.jpg?v=1676037916",
      description: "Cheese Flavor 5 Pack 24.7oz",
      brand: "Samyang",
    });

    await createRamen({
      name: "Gomtang",
      price: "$8.99",
      imgURL: "https://justasianfood.com/cdn/shop/products/Paldo_Gomtang_Noodle_b9f629d7-cd67-4844-a0a3-1e0c7fd54a04_300x300.jpg?v=1686271314",
      description: "Beef Bone Flavor Noodle Soup Family Pack 18oz",
      brand: "Paldo",
    });

    await createRamen({
      name: "Hot Chicken Ramen",
      price: "$3.69",
      imgURL: "https://justasianfood.com/cdn/shop/products/SamyangHotChickenRamenBigBowl3.7oz_front_300x300.jpg?v=1686268829",
      description: "Big Bowl 3.7oz",
      brand: "Samyang",
    });

    // await createRamen({
    //   name: "",
    //   price: "",
    //   imgURL: "",
    //   description: "",
    //   brand: "",
    // });

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
