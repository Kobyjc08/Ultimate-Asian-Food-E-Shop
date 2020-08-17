const express = require("express");
const app = express();
const port = 3001
const { Pool } = require('pg');
const bodyParser = require("body-parser");


const pool = new Pool({
  user: "JorgeMarioCobo",
  host: "localhost",
  database: "Asian_Food_E-shop",
  password: "",
  port: 5432,
});

app.use(bodyParser.json());

//CREATE AN ACCOUNT (USER)  => CREATE
app.post("/signup", function (req, res) {
    const {name, email, password, address, city, country} = req.body;
    let query = 'INSERT INTO customers (name, email, password, address, city, country) VALUES ($1, $2, $3, $4, $5, $6)'
    pool
    .query(query, [name, email, password, address, city, country])
    .then(result => res.status(201).send("Welcome to the Asian Market, you have create an account"))
    .catch(error => {
        console.log(error);
        res.status(500).send("Sorry, something went wrong")
    })
})

// GET ACCOUNT (USER) BY ID  => 
app.get("/costumer/:costumerId", function (req, res) {
  const costumerId = req.params.costumerId;
  pool
  .query('select * from customers where id=$1', [costumerId])
  .then(result => {
    if(result.rows.length > 0) {
        return res.json(result.rows[0]);
    
    } else {
        return res.status(400).send(`customer with Id = ${customerId} NOT FOUND`)
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send("something went wrong :( ...");
  });
})

// UPDATE information Account
app.put("/customer/:customerId", function (req,res) {
  const { newName, newEmail, newPassword, newAddress, newCity, newCountry } = req.body;
  const customerId = req.params.customerId;
  pool
  .query('update customers set name=$1, email=$2, "password"=$3, address=$4, city=$5, country=$6 where id=$7', [newName, newEmail, newPassword, newAddress, newCity, newCountry, customerId])
  .then(() => res.status(201).send(`customer ${customerId} Updated!`))
  .catch((e) =>console.error(e));
})




//CREATE LOGIN
app.post("/login")
//QUERY => Ehsan query goes here


// MANAGE PRODUCT  =>>> OPTIONAL FROM HERE // OR FROM THE DATA BASE OR //FROM ADMIN DASHBOARD
app.post("/product", function (req,res) {
  const {product_name, unit_price, product_description, product_pic } = req.body;
  let query = 'INSERT INTO products (product_name, unit_price, product_description, product_pic) VALUES ($1, $2, $3, $4)'
  pool
  .query(query, [product_name, unit_price, product_description, product_pic])
  .then(result => res.status(201).send(`Congratulations you have create new Product, ${product_name}`))
  .catch(error => {
      console.log(error);
      res.status(500).send("Sorry, something went wrong")
  })
});


app.delete("/product/:productId", function (req,res) {
  const productId = req.params.productId;
  let query = 'DELETE FROM products WHERE id=$1';
  pool
  .query(query, [productId])
  .then(result => res.status(201).send(`Product ${productId} Deleted succesfully!`))
  .catch(error => {
    console.log(error);
    res.status(500).send("something went Wrong!")
  })
})


app.put("/product/:productId", function (req, res) {
  let productId = req.params.productId;
  const {newProduct_name, newUnit_price, newProduct_description, newProduct_pic} = req.body
  let query = 'UPDATE products SET product_name=$1, unit_price=$2, product_description=$3, product_pic=$4 WHERE id=$5';
  pool
  .query(query, [ newProduct_name, newUnit_price, newProduct_description, newProduct_pic])
  .then(()=> res.send(`product ${productId} Updated!`))
  .catch(error => {
    console.log(error);
    res.status(500).send("something went wrong!!")
  })
})


//GET PRODUCT BY NAME ---DONE EHSAN
app.get("/product/:productName")
//GET ALL PRODUCT BY CATEGORIES ---DONE EHSAN
app.get("/product/:categoriesName")
//GET PRODUCT BY ID ---DONE EHSAN
app.get("/product/:productId")



//GET SHOPPING CART BY USER ID =>  order Items
app.get("/orderItems/:userId")
app.post("/orderItems")
app.put("/orderItems")
app.delete("/orderItems")

//GET CHECKOUT INFO  ( SHIPPING ADDRESS - PAYMENT METHOD - PAYMENT SUCCESFULL)
app.get("/checkout/:userId")




app.listen(3001, function () {
  console.log("Server is listening on port 3001. Ready to accept requests!");
});