var connection = require("./connection.js");

var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;

      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

      console.log(queryString);

      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      });
    },


    selectAll: function(tableInput, colToSearch, valOfCol) {
      var queryString = "SELECT * FROM ?? WHERE ?? = ?";
      connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    selectAndOrder: function(whatToSelect, table, orderCol) {
      var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
      console.log(queryString);
      connection.query(queryString, [whatToSelect, table, orderCol], function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    findWhoHasMost: function(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
      var queryString =
        "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";
  
      connection.query(
        queryString,
        [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol],
        function(err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    }
  };
  
  module.exports = orm;