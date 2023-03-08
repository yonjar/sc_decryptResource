const fs = require("fs").promises;

async function readJSON(path) {
  const data = await fs.readFile(path, "utf8");
  return JSON.parse(data);
}

module.exports = readJSON;
