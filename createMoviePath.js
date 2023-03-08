const fs = require("fs");
const { getMoviePath } = require("./utils/getPath");
const EventEmitter = require("events").EventEmitter;

const dataPath = __dirname + "/data/sort.json";
const out = __dirname + "/data/data.json";

let tmp_out = {};
let emitter = new EventEmitter();

fs.readFile(dataPath, "utf8", async (err, data_raw) => {
  if (err) {
    console.log("Error: " + err);
    return;
  }

  let data = JSON.parse(data_raw);

  for (let idol of Object.keys(data)) {
    tmp_out[idol] = {};
    // console.log(idol);
    for (let card of data[idol]["produceIdols"]) {
      let checkFilename = /アイドルロード|白いツバサ/g.test(card.name);
      if (checkFilename) continue;

      tmp_out[idol][card.name] = await getMoviePath(
        card.id,
        card.hash,
        card.name,
        card.rarity
      );
    }
  }

  emitter.emit("done", JSON.stringify(tmp_out));
  console.log("done emitted");
});

emitter.on("done", (data) => {
  fs.writeFileSync(out, data, "utf8");
});
