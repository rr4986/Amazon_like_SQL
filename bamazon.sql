CREATE DATABASE	 Bamazon;

USE Bamazon;

CREATE TABLE products(
position INTEGER auto_increment NOT NULL,
item_id INTEGER(250) NOT NULL,
product_name VARCHAR(1000) NOT NULL,
department_name VARCHAR(1000) NOT NULL,
price INTEGER(250) NOT NULL,
stock_quantity INTEGER(250) NOT NULL,
primary key(position)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
        values (101, "football", "sports", 5, 5),
                (102, "basketball", "sports", 5, 5),
				(103, "baseball", "sports", 1, 10),
                (201, "wine_glass", "kitchen", 3, 10),
                (202, "hi_glass", "kitchen", 3, 10),
                (203, "low_glass", "kitchen", 2, 10),
                (301, "teeshirt", "clothes", 10, 20),
                (302, "shorts", "clothes", 25, 15),
                (303, "pants", "clothes", 50, 20),
                (401, "toothbrush", "bathroom", 4, 20);
                


