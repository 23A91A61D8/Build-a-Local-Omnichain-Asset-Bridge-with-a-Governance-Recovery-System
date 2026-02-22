const fs = require("fs");
const path = require("path");

const FILE_PATH =
  process.env.DB_PATH ||
  path.join(__dirname, "data/processed_nonces.json");

function loadState() {
  if (!fs.existsSync(FILE_PATH)) {
    return { processed: {} };
  }
  return JSON.parse(fs.readFileSync(FILE_PATH));
}

function saveState(state) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(state, null, 2));
}

function isProcessed(state, key) {
  return state.processed[key] === true;
}

function markProcessed(state, key) {
  state.processed[key] = true;
  saveState(state);
}

module.exports = {
  loadState,
  isProcessed,
  markProcessed
};