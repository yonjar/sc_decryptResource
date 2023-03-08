const sha256 = require("js-sha256");
const dayjs = require("dayjs");

const sc_url = "https://shinycolors.enza.fun/assets/";

function getSpinePath(id) {
  let cats = ["cb", "cb_costume", "stand", "stand_costume"];
  if (/300\d{4}070/.test(id.toString())) {
    cats = ["cb_costume", "stand_costume"];
  }
  if (/300\d{4}250/.test(id.toString())) {
    cats = ["cb", "stand"];
  }
  let head = "da/assets/";
  let list = [];

  for (const cat of cats) {
    let obj = {
      path: `spine/idols/${cat}/${id}`,
      files: [
        {
          name: "data.atlas",
          url: sc_url + sha256(`${head}spine/idols/${cat}/${id}/data.atlas`),
        },
        {
          name: "data.json",
          url: sc_url + sha256(`${head}spine/idols/${cat}/${id}/data.json`),
        },
        {
          name: "data.png",
          url: sc_url + sha256(`${head}spine/idols/${cat}/${id}/data.png`),
        },
      ],
    };

    list.push(obj);
  }

  return list;
}

// sha256('20/assets/movies/idols/card/2a82768f7a4218749f7175b626e443e6_1040050050.mp4')
//"movies/idols/card_costume/bd3f88f9827d1ff41957b1a4942852e1_3000070140.mp4"
//"movies/idols/card_costume/85e2274a2fca9faf640219c834e0c8d8_3000070040.mp4"

function getAssetMapPath(num) {
  let chunkName = `asset-map-chunk-${num}.json`;
  return sc_url + sha256(`a${num % 10}/assets/asset-map-chunk-${num}.json`);
}

function getMoviePath({ id, idolId, hash, name, openAt, rarity, kind }) {
  let cid = id.length === 10 ? id : idolId;
  if (kind === "plain") {
    console.log(`${cid}没觉醒动画 跳过...`);
    return [];
  }
  let combo = hash + "_" + cid;
  let tail = combo[0] + combo[combo.length - 1];
  let head = tail + "/assets";
  let cats = ["card", "card_costume", "card_costume_short"];
  let path_raw = "";
  let releaseDate = openAt
    ? `_[${dayjs.unix(openAt).format("YYYY-MM-DD")}]`
    : "";

  if (rarity != 4) {
    cats = ["card_costume"];
  }

  let list = [];
  for (const cat of cats) {
    path_raw = `${head}/movies/idols/${cat}/${combo}.mp4`;

    list.push({
      // path: path_raw,
      url: sc_url + sha256(path_raw) + ".mp4",
      // name: (cat == "card" ? name : name + "_cotsume") + ".mp4",
      name: `${cid}_${
        cat == "card" ? name : name + "_cotsume"
      }${releaseDate}.mp4`,
    });
  }
  return list;
}

function getImagePath(id, hash) {
  let combo = hash + "_" + id;
  let tail = combo[0] + combo[combo.length - 1];
  let head = tail + "/assets/";
  let cats = ["card", "fes_card"];
  let path_raw = "";

  let list = [];
  for (const cat of cats) {
    path_raw = `${head}images/content/idols/${cat}/${combo}.jpg`;

    list.push({
      path: path_raw,
      url: sc_url + sha256(path_raw),
    });
  }

  return list;
}

module.exports = { getSpinePath, getMoviePath, getImagePath, getAssetMapPath };
