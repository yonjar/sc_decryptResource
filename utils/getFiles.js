const fs = require("fs");
var { mkdirsSync } = require("./mkdirs");
const https = require("https");

async function gf(url, path, filename) {
  if (!fs.existsSync(path)) {
    mkdirsSync(path);
    console.log("mkdir: " + path);
  }

  const options = {
    url: url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
    },
  };

  https
    .get(url, (res) => {
      //   res.setEncoding("binary");
      console.log("dl: " + path + filename);
      res.pipe(fs.createWriteStream(path + filename, { flags: "w" }));
      res.on("end", () => {
        console.log(path + filename + " 下载完了");
        // cb();
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
}

module.exports = gf;
