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
    const {name, user_name, password, address, city, country} = req.body;
    let query = 'INSERT INTO customers (name, user_name, password, address, city, country) VALUES ($1, $2, $3, $4, $5, $6)'
    pool
    .query(query, [name, user_name, password, address, city, country])
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
  console.log(req.body)
  const { name, user_name, password, address, city, country } = req.body;
  const customerId = req.params.customerId;
  pool
  .query('update customers set name=$1, user_name=$2, "password"=$3, address=$4, city=$5, country=$6 where id=$7', [name, user_name, password, address, city, country, customerId])
  .then(() => res.status(201).send(`customer ${customerId} Updated!`))
  .catch((e) =>console.error(e));
})




//CREATE LOGIN
app.post("/login", function (req, res) {
  const { user_name:email, password } = req.body;
  let query = 'select * from customers c where c.user_name=$1 and c."password"=$2';
  pool
  .query(query, [email, password])
  .then(result => {
    if(result.rows.length > 0) {
      return res.send("Ok")
    }  else {
      return res.status(404).send("You need to enter a valid Email and Password")
    } 
  })
  .catch(error => {
    console.log(error);
    res.status(500).send("Sorry, something went wrong")
  })
});



// MANAGE PRODUCT  =>>> OPTIONAL FROM HERE // OR FROM THE DATA BASE OR //FROM ADMIN DASHBOARD
app.post("/product", function (req,res) {
  const {product_name, unit_price, description, product_pic, category_id } = req.body;
  let query = 'INSERT INTO products (product_name, unit_price, description, product_pic, category_id) VALUES ($1, $2, $3, $4, $5)'
  pool
  .query(query, [product_name, unit_price, description, product_pic, category_id])
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
  const {product_name, unit_price, description, product_pic} = req.body
  let query = 'UPDATE products SET product_name=$1, unit_price=$2, description=$3, product_pic=$4 WHERE id=$5';
  pool
  .query(query, [ product_name, unit_price, description, product_pic, productId])
  .then(()=> res.send(`product ${productId} Updated!`))
  .catch(error => {
    console.log(error);
    res.status(500).send("something went wrong!!")
  })
})


//GET PRODUCT BY NAME ---DONE EHSAN
app.get("/products/:productName", function (req, res) {
  const productName = req.params.productName;
  console.log(req.params.productName);
  pool
    .query("select * from products  where product_name like $1", [
      `%${productName}%`,
    ])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

//GET ALL PRODUCT BY CATEGORIES ---DONE EHSAN
app.get("/productsByCategory/:categoriesName", function (req, res) {
  const product = req.params.categoriesName;
  pool
    .query(
      "select * from products join categories on products.category_id = categories.id where categories.name like $1",
      [`%${product}%`]
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

//GET PRODUCT BY ID ---DONE EHSAN
app.get("/productsByID/:productid", function (req, res) {
  const productId = req.params.productid;
  console.log(req.params.productid);
  pool
    .query("select * from products  where id=$1", [productId])
    .then((result) => res.json(result.rows[0]))
    .catch((e) => console.error(e));
});



//GET SHOPPING CART BY USER ID =>  order Items
app.get("/orderItems/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  pool
  .query('select o.order_reference, p.product_name, p.unit_price, oi.quantity from products p inner join order_items oi on p.id=oi.product_id inner join orders o on oi.order_id=o.id inner join customers c on o.customer_id=c.id where c.id=$1', [customerId])
  .then((result) => res.json(result.rows))
  .catch((e) => console.error(e));
})

//CREATE AN ORDER
app.post("/orders", function (req,res) {
  const {order_reference, customer_id} = req.body;
  let now = new Date();
  let query = 'INSERT INTO orders ( order_date, order_reference, customer_id ) VALUES ($1, $2, $3)';
  pool
  .query(query, [now, order_reference, customer_id])
  .then(result => res.status(201).send("Order Created!!"))
  .catch(error => {
    console.log(error);
    res.status(500).send("something went wrong...!")
  })
});

//CREATE ITEMS FOR EACH ORDER
app.post("/orderItems", function (req, res) {
  const {order_id, product_id, quantity} = req.body;
  let query = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)';
  pool
  .query(query, [order_id, product_id, quantity])
  .then(result => res.status(201).send("Item Created!"))
  .catch(error => {
    console.log(error);
    res.status(500).send("something went wrong!")
  })
});
//MODIFY ITMES OF AN ORDER
app.put("/orderItems/:orderItemsId", function(req,res) {
   const { order_id, product_id, quantity} = req.body;
   const orderItemsId = req.params.orderItemsId;
   let query = 'UPDATE order_items oi SET order_id=$1, product_id=$2, quantity=$3 WHERE oi.id=$4';
   pool
   .query(query, [order_id, product_id, quantity, orderItemsId])
   .then(result => res.status(201).send(`Item ${orderItemsId} Updated!`))
   .catch(error => {
     console.group(error);
     res.status(500).send("something went wrong!")
   })
});

//DELETE AND ORDER BY ORDER ID
app.delete("/order/:orderId", function(req, res) {
  const orderId = req.params.orderId;
  let query = 'SELECT * FROM order_items oi WHERE oi.order_id=$1';
  console.log(orderId)
  pool
  .query(query, [orderId])
  .then((result) => {
    if(result.rows.length <= 0) {
      pool
      .query('DELETE FROM orders o WHERE o.id=$1', [orderId])
      .then(result => res.status(201).send(`Customer ${orderId} Deleted`))
      .catch(error => {
        console.log(error);
        res.status(500).send("something went wrong")
      })
    } else {
      return res.status(400).send("The Order has items, can not be deleted!");
    }
  }) 
});

//DELETE AN ITME FROM ORDER BY ORDERITEM ID
app.delete("/orderItems/:orderItemsId", function(req, res) {
  const orderItemsId = req.params.orderItemsId;
  pool
  .query('DELETE FROM order_items oi WHERE oi.id=$1', [orderItemsId])
  .then(result => res.status(201).send(`Item ${orderItemsId} Deleted!`))
  .catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});

//GET CHECKOUT INFO  ( SHIPPING ADDRESS - PAYMENT METHOD - PAYMENT SUCCESFULL)
app.get("/checkout/:userId")




app.listen(3001, function () {
  console.log("Server is listening on port 3001. Ready to accept requests!");
});