const ax = require("axios");
const { v4: uuidv4 } = require("uuid");
const {
  getSpinePath,
  getMoviePath,
  getImagePath,
  getAssetMapPath,
} = require("./getPath");

function createSpineArray(id) {
  let dl_list = [];
  let path_list = getSpinePath(id);

  for (const obj of path_list) {
    let path = obj.path;
    for (const file of obj.files) {
      dl_list.push({
        id: uuidv4(),
        jsonrpc: "2.0",
        method: "aria2.addUri",
        params: [
          [file.url],
          {
            dir: "./" + path,
            out: file.name,
          },
        ],
      });
    }
  }
  return dl_list;
}

function createMovieArray(card) {
  let dl_list = [];
  let path_list = getMoviePath(card);

  for (const file of path_list) {
    dl_list.push({
      id: uuidv4(),
      jsonrpc: "2.0",
      method: "aria2.addUri",
      params: [
        [file.url],
        {
          dir: "./movie",
          out: file.name,
        },
      ],
    });
  }
  return dl_list;
}

function createDownloadListFromJSON(json) {
  let dl_list = [];
  let path_list = JSON.parse(json);

  for (const file of path_list) {
    dl_list.push({
      id: uuidv4(),
      jsonrpc: "2.0",
      method: "aria2.addUri",
      params: [
        [file.url],
        {
          dir: "./movie/1080p",
          out: file.name,
        },
      ],
    });
  }
  return dl_list;
}

function aria(data) {
  if (data.length < 1) return;

  const rpc = "http://127.0.0.1:6800/jsonrpc";
  ax({
    url: rpc,
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: data,
  }).then((res) => console.log(res.data));
}

function dl_spine(id) {
  return aria(createSpineArray(id));
}
function dl_spine_path(id) {
  return aria(createSpineArray(id));
}
function dl_mv(card) {
  return aria(createMovieArray(card));
}
function dl_mv_json(json) {
  return aria(createDownloadListFromJSON(json));
}

function test(url, path, filename) {
  const rpc = "http://127.0.0.1:6800/jsonrpc";
  ax({
    url: rpc,
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: {
      id: uuidv4(),
      jsonrpc: "2.0",
      method: "aria2.addUri",
      params: [
        [url],
        {
          dir: "./" + path,
          out: filename,
        },
      ],
    },
  }).then((res) => console.log(res.data));
}

// test(
//   "https://i0.hdslb.com/bfs/album/8c0619e0d5419f32b5affedd523af0b8fc0a8459.gif@518w_1e_1c.gif",
//   "pic",
//   "bili.gif"
// );
// console.log(createArray(1040120050).length);

module.exports = { dl_spine, dl_mv, dl_mv_json };
