const mongoose = require("mongoose"); 

module.exports = () => { 
  mongoose.connect(process.env.Mongoose); 
};