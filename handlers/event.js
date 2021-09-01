const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (bot) => { 
  try {
  // Events const 
eventFiles = await globPromise(`${process.cwd()}/events/*.js`); 
  eventFiles.map((value) => require(value))
  } catch (err) {
console.log(err) 
}
}  