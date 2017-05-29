mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "yaha9012",
  database: "Bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

var start = function () {
  connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  var table = [];
    for(var i = 0; i < res.length; i++) {
        var row = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,res[i].stock_quantity];
        table.push(row);
    }
    console.table(["ID","Item", "Department", "Price", "Stock"],table);
  });
  buyItem();
};

var buyItem = function() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to buy
    inquirer.prompt([
      {
        name: "choice",
        type: "input",
        message: "Select the item ID for the product you would like to buy"
      },
    // inquire how many theyd like to buy
      {
        name: "numberSelected",
        type: "input",
        message: "How many of that item would you like to buy"
      }
    ]).then(function(answer) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id == answer.choice) {
            chosenItem = results[i];
            //test if the stock quantity is available
            if (answer.numberSelected < results[i].stock_quantity) {
                console.log("Proceed");
                var newStock = results[i].stock_quantity - answer.numberSelected;
                connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
                }, {
                item_id: answer.choice
                }], function(error) {
                if (error) throw err;
                console.log("=============================");
                console.log("=============================");
                console.log("=============================");
                console.log("Bought items successfully!");
                console.log("=============================");
                console.log("=============================");
                console.log("=============================");
                start();
                });
            }
        
            else {
                // number selected is greater than available
                console.log("=============================");
                console.log("=============================");
                console.log("=============================");
                console.log("Insufficient quantity in stock. Try again...");
                console.log("=============================");
                console.log("=============================");
                console.log("=============================");
                start();
            }
        }
      }
    });
  });
};

start();