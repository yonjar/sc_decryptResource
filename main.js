const fs = require("fs");
const { dl_spine, dl_mv, dl_mv_json } = require("./utils/aria");
const gf = require("./utils/getFiles");
const {
  getSpinePath,
  getMoviePath,
  getImagePath,
  getAssetMapPath,
} = require("./utils/getPath");
const readJSON = require("./utils/readJSON");

//const ids = require("./utils/spineData");

async function main() {
  let idolsHash = await readJSON("./data/idolsHash.json");
  //let idolsCos = await readJSON("./data/idolsCos.json");
  let ids = ["1040230040"];
  for (let id of ids) {
    //dl_spine(id);
    dl_mv(idolsHash[id]);
  }

  // console.log(id, getSpinePath(id)[3].files[2].url);
  // console.log(getAssetMapPath(46));

  // for (let i = 1; i <= 25; i++) {
  //   let ii = i < 10 ? "0" + i : i.toString();
  //   let id = `3000${ii}0310`;
  //   dl_spine(id);
  //   dl_mv(idolsCos[id]);
  // }

  // for (let i of [1, 20]) {
  //   let ii = i < 10 ? "0" + i : i.toString();
  //   let id = `3000${ii}0300`;
  //   dl_spine(id);
  //   dl_mv(idolsCos[id]);
  // }
}

main();

// 01_5staging.mp4
async function test() {
  let idolsHash = await readJSON("./data/idolsHash.json");
  let list = [];

  for (let lun = 1; lun < 6; lun++) {
    let tmp = ids[`${lun}_pssr`];
    let holders = tmp.holder.map((v) => {
      return {
        name:
          idolsHash[`${tmp.flag1}0${v}0${tmp.flag2}0`].name.replace(
            /\//g,
            "-"
          ) + "_staging.mp4",
        url: `https://campaign-shinycolors.idolmaster.jp/ssr2020/static/media/${v}_${lun}staging.mp4`,
      };
    });

    // for (let holder of holders) {
    // }
    list.push(...holders);
  }

  dl_mv_json(JSON.stringify(list));
}

// test();

// dl_mv(idolsHash[id]);
// dl_mv(id, hash, name, openAt);
// dl_spine(id);

// console.log(getImagePath("1040070040", "47e58f6934c26cf841567c37339ed2fe"));
// console.log(getMoviePath(id, hash, "sd", 3));
