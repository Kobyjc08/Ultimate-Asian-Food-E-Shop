drop table if exists order_items;
drop table if exists orders;
drop table if exists customers;
drop table if exists products;
drop table if exists categories;
drop table if exists payment_details;

CREATE TABLE customers ( 
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  user_name VARCHAR(50),
  password VARCHAR(50),
  address VARCHAR(120),
  city VARCHAR(30),
  country VARCHAR(20)
  unique ("user_name")
  );
CREATE TABLE products ( 
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  description VARCHAR(800),
  unit_price INT NOT NULL,
  product_pic VARCHAR(200),
  category_id INT references categories(id)
  );

CREATE TABLE categories ( 
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
  );

CREATE TABLE orders ( 
  id SERIAL PRIMARY KEY,
  order_date DATE NOT NULL,
  order_reference VARCHAR(10) NOT NULL,
  customer_id INT REFERENCES customers(id)
  );

CREATE TABLE order_items ( 
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL
  );

CREATE TABLE payment_details ( 
  id SERIAL PRIMARY KEY,
  customers_id INT REFERENCES customers(id),
  card_number VARCHAR(50) NOT NULL,
  card_holder_name VARCHAR(50) NOT NULL,
  card_expiry_date DATE NOT NULL,
  cvv_code INT NOT NULL
  );


insert into customers (name, user_name, "password", address, city, country)
values ('Ehsan',
        'ihsan_raja@live.com',
        'mycode',
        '123street,gujrat',
        'gujrat',
        'Pakistan')
insert into customers (name, user_name, "password", address, city, country)
values ('Henriette',
        'henriette@live.com',
        'mypasscode',
        '234street,amsterdam',
        'Amsterdam',
        'Netherlands')
insert into customers (name, user_name, "password", address, city, country)
values ('Esteban',
        'esteban@live.com',
        'mypass',
        'calle 123,barcelona',
        'barcelona',
        'Spain')
insert into customers (name, user_name, "password", address, city, country)
values ('Jorge',
        'jorge@live.com',
        'passcode',
        'calle 666,barcelona',
        'barcelona',
        'Spain')
insert into categories (name)
values ('Desserts')
insert into categories (name)
values ('Asian Traditional  foods')
insert into categories (name)
values ('Spices')
insert into categories (name)
values ('Lentils/Rice/Flour')
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('Laziza Gulab Jamun ',
        'Gulab-yamun is a sweet from Pakistani cuisine and Indian cuisine, made with a dough, in which its main ingredients are khoya and maida, and which is then fried in oil in the form of small balls.',
        2.40,
        'link need to be created',
        1)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('Laziza Ras Malai',
        'Ras malai is an Indian dessert, popular throughout South Asia. It was created in West Bengal by Bengali chef KC Das in 1930. It is one of the most famous desserts in that region.',
        3.40,
        'link need to be created',
        1)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('.Laziza Falooda',
        'Falooda is a typical refreshing drink that can be found in South Asian countries, it is made with a mixture of milk, vermicelli noodles, basil seeds, tutti frutti and sugar, all with ice cream. The vermicelli used is made with maranta instead of wheat.',
        4.00,
        'link .....',
        1)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('Laziza Shahi Tukra',
        'Shahi tukra is a rich & festive dessert made with bread, ghee, sugar, milk and nuts. It is a very popular classic royal dessert and is said to have originated during the Mughal reign.',
        3.90,
        'link',
        1)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('Sheer Khorma Mix',
        'Sheer korma also called Sheer Khurma, which means milk with dates in Urdu language, is a sweet dish typical of the cuisine of India and Pakistan. It is a pudding made with vermicelli, milk, saffron, sugar, dates, as well as various species and ghee.',
        4.50,
        'link....',
        1)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('National Biryani Masala',
        'The spices and condiments used in biryani may include ghee (clarified butter), nutmeg, mace, pepper, cloves, cardamom, cinnamon, bay leaves, coriander, mint leaves, ginger, onions, tomatoes, green chilies, and garlic. The premium varieties include saffron.',
        2.00,
        'link',
        2)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('National Tikka Botti Masala',
        'Classic BBQ dish of Pakistani Cuisine. Tender pieces of chicken thighs marinated in spices and herbs, grilled over charcoal. The recipe below is very hot, you can adjust the heat per your taste by adjusting the amount of chillies.',
        4.40,
        'link',
        2)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('National Seekh Kabab Masala',
        'ingredients: Salt, Red Chilli, Cumin Seed, Black Pepper, Nutmeg, Coriander, Pomegranate Seed, Citric Acid (E330), Mace, Corn Starch, Monosodium Glutamate (E621) As Flavour Enhancer, Hairy Cucumber, Artificial Seekh Kabab Flavour, Mango Powder, Amorphous Silicone Dioxide (E551) As Anticaking Agent, Black Salt.',
        3.50,
        'link',
        2)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('National Fried Fiash Masala',
        'National Foods have been specially developed by a panel of experts, using the finest ingredients in exactly the right measure, enabling you to cook delicious traditional meals with ease. Ingredients: Salt, Red chilli, Ginger, Cumin seed, Garlic, Carom seed.',
        5.00,
        'link',
        2)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('National White Karahi Masala',
        'White karahi is a Pakistani Dhaba (roadside restaurant) food. This recipe is an amazing day saver and even face saver. When you have no time to cook or you have unexpected guest or you have been out whole day and you don’t want to order food because you want home-cooked food. This quick recipe of white karahi never disappoints on such occasions. And, did I tell you kids love it!',
        6.00,
        'link',
        2)
insert into products (product_name, description, unit_price, product_pic,category_id)
values ('Shan Chicken Broast Masala',
        'Shan chicken broast mix gives you the perfect blend of spices to help you prepare crispy, juicy and tender chicken broast for a perfect snack platter.',
        2.70,
        'link',
        2)
INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-06-01',
        'ORD001',
        1);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-07-15',
        'ORD002',
        1);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-07-11',
        'ORD003',
        1);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-05-24',
        'ORD004',
        2);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-05-30',
        'ORD005',
        3);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-07-05',
        'ORD006',
        4);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-04-05',
        'ORD007',
        4);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-07-23',
        'ORD008',
        3);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-07-24',
        'ORD009',
        3);


INSERT INTO orders (order_date, order_reference, customer_id)
VALUES ('2019-05-10',
        'ORD010',
        2);

-- change order id according to your database

INSERT INTO order_items (order_id, product_id, quantity)
VALUES(1,
       2,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(1,
       7,
       5);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(2,
       8,
       4);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(2,
       11,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(3,
       2,
       10);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(3,
       1,
       2);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(4,
       4,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(4,
       1,
       2);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(4,
       10,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(5,
       9,
       3);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(5,
       6,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(5,
       11,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(5,
       9,
       3);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(6,
       8,
       15);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(6,
       1,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(6,
       5,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(7,
       3,
       2);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(8,
       4,
       1);


INSERT INTO order_items (order_id, product_id, quantity)
VALUES(8,
       6,
       5);