const fs = require("fs");
const { dl_spine, dl_mv, dl_mv_json } = require("./utils/aria");
const cothing = require("./utils/spineData");

function dl_mv_from_json() {
  fs.readFile("./data/allUrl.json", "utf8", (err, data) => {
    if (err) {
      throw err;
      return;
    }

    dl_mv_json(data);
  });
}

function dl_skin_mv(costume) {
  let item = cothing[costume];
  let skinList = item["holder"].map(
    (id) => `${item.flag1}0${id}0${item.flag2}0`
  );
  // console.log(skinList);
  fs.readFile("./data/idolsCos.json", "utf8", (err, data) => {
    if (err) {
      throw err;
      return;
    }

    let card = JSON.parse(data);
    for (let id of skinList) {
      dl_mv(card[id]);
    }
  });
}

dl_skin_mv("1st_summer_party");
