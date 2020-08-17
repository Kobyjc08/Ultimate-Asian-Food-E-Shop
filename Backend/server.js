const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const pool = new Pool({
  user: "JorgeMarioCobo",
  host: "localhost",
  database: "Asian_Food_E-shop",
  password: "123",
  port: 5432,
});

app.get("/api/products", function (req, res) {
  pool
    .query("SELECT * FROM products")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

//CREATE AN ACCOUNT (USER)  => CREATE
app.post("/singup")

// GET ACCOUNT (USER) BY ID  => 
app.get("/user/:userId")
app.put("/user/:userId")


//CREATE LOGIN
app.post("/login")
//QUERY => Ehsan query goes here



//GET PRODUCT BY NAME
app.get("/product/:productName")
//GET ALL PRODUCT BY CATEGORIES
app.get("/product/:categoriesName")
//GET PRODUCT BY ID 
app.get("/product/:productId")
// MANAGE PRODUCT  =>>> OPTIONAL FROM HERE // OR FROM THE DATA BASE OR //FROM ADMIN DASHBOARD
app.post("/product")
app.delete("/product")
app.put("/product")


//GET SHOPPING CART BY USER ID =>  order Items
app.get("/orderItems/:userId")
app.post("/orderItems")
app.put("/orderItems")
app.delete("/orderItems")

//GET CHECKOUT INFO  ( SHIPPING ADDRESS - PAYMENT METHOD - PAYMENT SUCCESFULL)
app.get("/checkout/:userId")




app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});